import { Session } from "next-auth"

export function doctorScope(session: Session) {
  if (!session.user) {
    throw new Error("User is not defined in session");
  }
  return session.user.role === "SECRETARY"
    ? session.user.doctorId
    : session.user.id
}
