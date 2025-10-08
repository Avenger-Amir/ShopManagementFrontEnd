export function setSessionId(sessionId) {
    localStorage.setItem("sessionId", sessionId);
}

export function getSessionId() {
    return localStorage.getItem("sessionId");
}

export function setUserName(userName) {
    localStorage.setItem("userName", userName);
}

export function getUserName() {
    return localStorage.getItem("userName");
}