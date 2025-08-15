import {prisma} from "@repo/db/prisma"

export default async function Home(){
  const users = await prisma.user.findMany();
  return <div>
    {JSON.stringify(users)}
  </div>
}