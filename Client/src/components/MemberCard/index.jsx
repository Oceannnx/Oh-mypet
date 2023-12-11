import React from 'react'

export const MemberCard = (props) => {
  const {
    name,
    studentID,
    img,
    position,
    Github,
    GitHubLink,
    Facebook,
    FacebookLink,
    Discord,
    DiscordLink,
    Twitter,
    TwitterLink,
    Instagram,
    InstagramLink,
  } = props || ''
  return (
    <>
      <div className="grid grid-cols-2">
        <div className="flex justify-center border flex-col w-fit p-10 mx-10 mb-5">
          <img className="w-64 mx-1 rounded-md " src={img}></img>
          <div className="m-1">Name : {name}</div>
          <div className="m-1">Student ID : {studentID}</div>
          <div className="m-1">Position : {position}</div>
          <div className="m-1">{position}</div>
          <a className="w-8 m-1" href={GitHubLink || ''}>
            <div className="flex">
              <img src="\src\assets\github-mark-c791e9551fe4\github-mark\github-mark.png"></img>
              <nobr className="flex items-center mx-2"> : {Github}</nobr>
            </div>
          </a>
          <a className="w-8 m-1" href={FacebookLink || ''}>
            <div className="flex">
              <img src="\src\assets\facebook.png"></img>
              <nobr className="flex items-center mx-2"> : {Facebook}</nobr>
            </div>
          </a>
          <a className="w-8 m-1" href={InstagramLink || ''}>
            <div className="flex">
              <img src="\src\assets\instagram.png"></img>
              <nobr className="flex items-center mx-2"> : {Instagram}</nobr>
            </div>
          </a>
          <a className="w-8 m-1" href={TwitterLink || ''}>
            <div className="flex">
              <img src="\src\assets\twitter.png"></img>
              <nobr className="flex items-center mx-2"> : {Twitter}</nobr>
            </div>
          </a>
          <a className="w-8 m-1" href={DiscordLink || ''}>
            <div className="flex">
              <img src="https://skillicons.dev/icons?i=discord"></img>
              <nobr className="flex items-center mx-2"> : {Discord}</nobr>
            </div>
          </a>
        </div>
        <div className="flex justify-center border flex-col w-fit p-10 mx-10 mb-5">
          <img className="w-64 mx-1 rounded-md " src={img}></img>
          <div className="m-1">Name : {name}</div>
          <div className="m-1">Student ID : {studentID}</div>
          <div className="m-1">Position : {position}</div>
          <div className="m-1">{position}</div>
          <a className="w-8 m-1" href={GitHubLink || ''}>
            <div className="flex">
              <img src="\src\assets\github-mark-c791e9551fe4\github-mark\github-mark.png"></img>
              <nobr className="flex items-center mx-2"> : {Github}</nobr>
            </div>
          </a>
          <a className="w-8 m-1" href={FacebookLink || ''}>
            <div className="flex">
              <img src="\src\assets\facebook.png"></img>
              <nobr className="flex items-center mx-2"> : {Facebook}</nobr>
            </div>
          </a>
          <a className="w-8 m-1" href={InstagramLink || ''}>
            <div className="flex">
              <img src="\src\assets\instagram.png"></img>
              <nobr className="flex items-center mx-2"> : {Instagram}</nobr>
            </div>
          </a>
          <a className="w-8 m-1" href={TwitterLink || ''}>
            <div className="flex">
              <img src="\src\assets\twitter.png"></img>
              <nobr className="flex items-center mx-2"> : {Twitter}</nobr>
            </div>
          </a>
          <a className="w-8 m-1" href={DiscordLink || ''}>
            <div className="flex">
              <img src="https://skillicons.dev/icons?i=discord"></img>
              <nobr className="flex items-center mx-2"> : {Discord}</nobr>
            </div>
          </a>
        </div>
      </div>
    </>
  )
}
