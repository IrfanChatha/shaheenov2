import { auth } from "@/auth"
import InfluencersStudio from "./influencers-studio"

export default async function Page() {
  const session = await auth()
  const sessionProp = session
    ? {
        provider: session.provider || null,
        user: {
          name: session.user?.name || null,
          email: session.user?.email || null,
          image: session.user?.image || null,
        },
      }
    : null
  return <InfluencersStudio session={sessionProp} />
}
