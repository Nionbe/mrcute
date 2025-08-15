// Centralized data management system for Safari Academy
interface User {
  id: string
  name: string
  email: string
  role: "teacher" | "student" | "parent" | "admin"
  grade?: string
  subject?: string
}

interface Note {
  id: string
  title: string
  content: string
  subject: string
  grade: string
  createdAt: string
  updatedAt: string
  teacherId: string
  teacherName: string
  views: number
  isPublished: boolean
}

interface Quiz {
  id: string
  title: string
  description: string
  subject: string
  grade: string
  timeLimit: number
  questions: Question[]
  showAnswers: boolean
  createdAt: string
  updatedAt: string
  teacherId: string
  teacherName: string
  isPublished: boolean
  submissions: number
}

interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation?: string
}

interface Notification {
  id: string
  title: string
  message: string
  type: "quiz" | "note" | "general" | "announcement"
  targetRole?: "teacher" | "student" | "parent" | "all"
  targetGrade?: string
  read: boolean
  createdAt: string
  senderId: string
  senderName: string
  recipientId?: string
}

class DataManager {
  private static instance: DataManager
  private broadcastChannel: BroadcastChannel
  private listeners: Map<string, Function[]> = new Map()

  private constructor() {
    this.broadcastChannel = new BroadcastChannel("safari-academy-sync")
    this.setupBroadcastListener()
    this.initializeDefaultData()
  }

  static getInstance(): DataManager {
    if (!DataManager.instance) {
      DataManager.instance = new DataManager()
    }
    return DataManager.instance
  }

  private setupBroadcastListener() {
    this.broadcastChannel.addEventListener("message", (event) => {
      const { type, data } = event.data
      this.notifyListeners(type, data)
    })
  }

  private initializeDefaultData() {
    // Initialize with some default data if none exists
    if (!this.getData("users")) {
      const defaultUsers: User[] = [
        {
          id: "teacher-1",
          name: "Sarah Johnson",
          email: "sarah.johnson@safariacademy.edu",
          role: "teacher",
          grade: "10",
          subject: "Mathematics",
        },
        {
          id: "student-1",
          name: "Alex Smith",
          email: "alex.smith@student.safariacademy.edu",
          role: "student",
          grade: "10",
        },
        {
          id: "student-2",
          name: "Emma Davis",
          email: "emma.davis@student.safariacademy.edu",
          role: "student",
          grade: "10",
        },
      ]
      this.setData("users", defaultUsers)
    }

    if (!this.getData("notes")) {
      this.setData("notes", [])
    }

    if (!this.getData("quizzes")) {
      this.setData("quizzes", [])
    }

    if (!this.getData("notifications")) {
      this.setData("notifications", [])
    }
  }

  // Generic data operations
  private getData(key: string): any {
    try {
      const data = localStorage.getItem(`safari-academy-${key}`)
      return data ? JSON.parse(data) : null
    } catch (error) {
      console.error(`Error getting data for key ${key}:`, error)
      return null
    }
  }

  private setData(key: string, data: any): void {
    try {
      localStorage.setItem(`safari-academy-${key}`, JSON.stringify(data))
      // Broadcast the change to other tabs/windows
      this.broadcastChannel.postMessage({ type: `${key}-updated`, data })
    } catch (error) {
      console.error(`Error setting data for key ${key}:`, error)
    }
  }

  // User management
  getUsers(): User[] {
    return this.getData("users") || []
  }

  getUserById(id: string): User | null {
    const users = this.getUsers()
    return users.find((user) => user.id === id) || null
  }

  getUserByEmail(email: string): User | null {
    const users = this.getUsers()
    return users.find((user) => user.email === email) || null
  }

  // Notes management
  getNotes(): Note[] {
    return this.getData("notes") || []
  }

  getNotesByGrade(grade: string): Note[] {
    const notes = this.getNotes()
    return notes.filter((note) => note.grade === grade && note.isPublished)
  }

  getNotesByTeacher(teacherId: string): Note[] {
    const notes = this.getNotes()
    return notes.filter((note) => note.teacherId === teacherId)
  }

  createNote(noteData: Omit<Note, "id" | "createdAt" | "updatedAt" | "views">): Note {
    const notes = this.getNotes()
    const newNote: Note = {
      ...noteData,
      id: `note-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      views: 0,
    }

    const updatedNotes = [newNote, ...notes]
    this.setData("notes", updatedNotes)

    // Create notification for students
    this.createNotification({
      title: "New Study Material Available",
      message: `Your teacher has shared a new note: "${newNote.title}"`,
      type: "note",
      targetRole: "student",
      targetGrade: newNote.grade,
      senderId: newNote.teacherId,
      senderName: newNote.teacherName,
    })

    return newNote
  }

  updateNote(noteId: string, updates: Partial<Note>): Note | null {
    const notes = this.getNotes()
    const noteIndex = notes.findIndex((note) => note.id === noteId)

    if (noteIndex === -1) return null

    const updatedNote = {
      ...notes[noteIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    }

    notes[noteIndex] = updatedNote
    this.setData("notes", notes)

    return updatedNote
  }

  deleteNote(noteId: string): boolean {
    const notes = this.getNotes()
    const filteredNotes = notes.filter((note) => note.id !== noteId)

    if (filteredNotes.length === notes.length) return false

    this.setData("notes", filteredNotes)
    return true
  }

  // Quiz management
  getQuizzes(): Quiz[] {
    return this.getData("quizzes") || []
  }

  getQuizzesByGrade(grade: string): Quiz[] {
    const quizzes = this.getQuizzes()
    return quizzes.filter((quiz) => quiz.grade === grade && quiz.isPublished)
  }

  getQuizzesByTeacher(teacherId: string): Quiz[] {
    const quizzes = this.getQuizzes()
    return quizzes.filter((quiz) => quiz.teacherId === teacherId)
  }

  createQuiz(quizData: Omit<Quiz, "id" | "createdAt" | "updatedAt" | "submissions">): Quiz {
    const quizzes = this.getQuizzes()
    const newQuiz: Quiz = {
      ...quizData,
      id: `quiz-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      submissions: 0,
    }

    const updatedQuizzes = [newQuiz, ...quizzes]
    this.setData("quizzes", updatedQuizzes)

    // Create notification for students
    this.createNotification({
      title: "New Quiz Available",
      message: `Your teacher has created a new quiz: "${newQuiz.title}"`,
      type: "quiz",
      targetRole: "student",
      targetGrade: newQuiz.grade,
      senderId: newQuiz.teacherId,
      senderName: newQuiz.teacherName,
    })

    return newQuiz
  }

  updateQuiz(quizId: string, updates: Partial<Quiz>): Quiz | null {
    const quizzes = this.getQuizzes()
    const quizIndex = quizzes.findIndex((quiz) => quiz.id === quizId)

    if (quizIndex === -1) return null

    const updatedQuiz = {
      ...quizzes[quizIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    }

    quizzes[quizIndex] = updatedQuiz
    this.setData("quizzes", quizzes)

    return updatedQuiz
  }

  deleteQuiz(quizId: string): boolean {
    const quizzes = this.getQuizzes()
    const filteredQuizzes = quizzes.filter((quiz) => quiz.id !== quizId)

    if (filteredQuizzes.length === quizzes.length) return false

    this.setData("quizzes", filteredQuizzes)
    return true
  }

  // Notification management
  getNotifications(): Notification[] {
    return this.getData("notifications") || []
  }

  getNotificationsForUser(userId: string, userRole: string, userGrade?: string): Notification[] {
    const notifications = this.getNotifications()
    return notifications
      .filter((notification) => {
        // Check if notification is for this specific user
        if (notification.recipientId && notification.recipientId !== userId) {
          return false
        }

        // Check role targeting
        if (notification.targetRole && notification.targetRole !== "all" && notification.targetRole !== userRole) {
          return false
        }

        // Check grade targeting for students
        if (notification.targetGrade && userGrade && notification.targetGrade !== userGrade) {
          return false
        }

        return true
      })
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }

  createNotification(notificationData: Omit<Notification, "id" | "createdAt" | "read">): Notification {
    const notifications = this.getNotifications()
    const newNotification: Notification = {
      ...notificationData,
      id: `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      read: false,
    }

    const updatedNotifications = [newNotification, ...notifications]
    this.setData("notifications", updatedNotifications)

    return newNotification
  }

  markNotificationAsRead(notificationId: string): boolean {
    const notifications = this.getNotifications()
    const notificationIndex = notifications.findIndex((n) => n.id === notificationId)

    if (notificationIndex === -1) return false

    notifications[notificationIndex].read = true
    this.setData("notifications", notifications)

    return true
  }

  markAllNotificationsAsRead(userId: string, userRole: string, userGrade?: string): void {
    const notifications = this.getNotifications()
    const userNotifications = this.getNotificationsForUser(userId, userRole, userGrade)

    userNotifications.forEach((notification) => {
      const index = notifications.findIndex((n) => n.id === notification.id)
      if (index !== -1) {
        notifications[index].read = true
      }
    })

    this.setData("notifications", notifications)
  }

  // Event listeners for real-time updates
  addEventListener(eventType: string, callback: Function): void {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, [])
    }
    this.listeners.get(eventType)!.push(callback)
  }

  removeEventListener(eventType: string, callback: Function): void {
    const callbacks = this.listeners.get(eventType)
    if (callbacks) {
      const index = callbacks.indexOf(callback)
      if (index > -1) {
        callbacks.splice(index, 1)
      }
    }
  }

  private notifyListeners(eventType: string, data: any): void {
    const callbacks = this.listeners.get(eventType)
    if (callbacks) {
      callbacks.forEach((callback) => callback(data))
    }
  }

  // Utility methods
  getCurrentUser(): User | null {
    const currentUserId = localStorage.getItem("currentUserId")
    return currentUserId ? this.getUserById(currentUserId) : null
  }

  setCurrentUser(userId: string): void {
    localStorage.setItem("currentUserId", userId)
  }

  logout(): void {
    localStorage.removeItem("currentUserId")
  }
}

export default DataManager
export type { User, Note, Quiz, Question, Notification }
