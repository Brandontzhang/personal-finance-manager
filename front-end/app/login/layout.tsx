import AuthProvider from "../context/AuthContext"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <AuthProvider>{children}</AuthProvider>
    </div>
  )
}
