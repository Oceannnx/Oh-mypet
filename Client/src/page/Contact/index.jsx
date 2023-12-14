import { Member } from '../../contents/Member/index'
import { MemberCard } from '../../components/MemberCard'
import { Footer } from '../../components/Footer'

export const Contact = () => {
  return (
    <>
      <div className="text-5xl flex justify-center m-10">Member</div>
      <div className="mx-20 flex justify-center">
        {Member.map((member, index) => {
          return (
            <MemberCard
              key={index}
              name={member.name}
              studentID={member.studentId}
              img={member.img}
              position={member.position}
              GitHubLink={member.GithubLink}
              Github={member.Github}
              FacebookLink={member.FacebookLink}
              Facebook={member.Facebook}
              DiscordLink={member.DiscordLink}
              Discord={member.Discord}
              TwitterLink={member.TwitterLink}
              Twitter={member.Twitter}
              InstagramLink={member.InstagramLink}
              Instagram={member.Instagram}
            />
          )
        })}
      </div>
      <Footer />
    </>
  )
}
