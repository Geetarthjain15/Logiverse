import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        companyName: { label: 'Company Name', type: 'text' },
        location: { label: 'Location', type: 'text' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // For demo purposes, we'll create a mock user
        // In production, you'd verify against a database
        const user = {
          id: '1',
          email: credentials.email,
          name: credentials.companyName || 'Demo Company',
          image: null,
          companyName: credentials.companyName || 'Demo Company',
          location: credentials.location || 'Delhi',
        }

        return user
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    signUp: '/auth/signup',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.companyName = user.companyName
        token.location = user.location
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub
        session.user.companyName = token.companyName
        session.user.location = token.location
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET || 'your-secret-key',
})

export { handler as GET, handler as POST }
