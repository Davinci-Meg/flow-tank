export type Locale = "ja" | "en" | "zh" | "ko" | "es" | "de";

export type Translations = {
  common: {
    appName: string;
    login: string;
    signup: string;
    logout: string;
    loginPrompt: string;
    buyMeCoffee: string;
    loading: string;
    or: string;
    minutes: string;
    days: string;
    times: string;
    uncategorized: string;
  };
  nav: {
    home: string;
    todos: string;
    calendar: string;
    stats: string;
    settings: string;
    mypage: string;
    openMenu: string;
    closeMenu: string;
  };
  timer: {
    running: string;
    paused: string;
    break: string;
    longBreak: string;
    idle: string;
    session: string;
    reset: string;
    start: string;
    pause: string;
    resume: string;
    skip: string;
    labelPlaceholder: string;
  };
  auth: {
    loginTab: string;
    signupTab: string;
    emailLabel: string;
    passwordLabel: string;
    passwordPlaceholder: string;
    loginButton: string;
    signupButton: string;
    googleLogin: string;
  };
  todos: {
    title: string;
    inputPlaceholder: string;
    priorityHigh: string;
    priorityMedium: string;
    priorityLow: string;
    priority: string;
    filterAll: string;
    filterActive: string;
    filterCompleted: string;
    emptyAll: string;
    emptyActive: string;
    emptyCompleted: string;
    delete: string;
  };
  calendar: {
    title: string;
    weekdays: string[];
    noSessions: string;
    sessionTitle: string;
    yearMonthFormat: string;
    dateFormat: string;
  };
  stats: {
    title: string;
    weeklyTotal: string;
    monthlyTotal: string;
    streak: string;
    avgSessions: string;
    weeklyChart: string;
    monthlyChart: string;
    labelBreakdown: string;
    focusTime: string;
    weekdays: string[];
  };
  settings: {
    title: string;
    workDuration: string;
    breakDuration: string;
    longBreakDuration: string;
    sessionCount: string;
    save: string;
    saved: string;
  };
  mypage: {
    title: string;
    avatar: string;
    registeredAt: string;
  };
};
