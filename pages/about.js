import { client } from '../lib/apollo.js';
import { gql } from "@apollo/client";
import { parseMembers } from '../util/parseMembers';
import { parseEntities } from '../util/parseEntities';
import MemberCard from '../components/MemberCard';
import EntityCard from '../components/EntityCard';
import MemberModal from '../components/MemberModal';

export default function About({ members, affiliateEntities }) {
  const { executiveDirector, operationsManager, execCommittee, boardOfDirectors } = parseMembers(members);
  const { memberEntities, affiliateOrganizations, lawSchools } = parseEntities(affiliateEntities);

  return (
    <div>
      <div className="max-w-screen-lg flex flex-wrap flex-row m-auto content-center">
        <div className="w-full m-4 text-4xl py-12 md:leading-relaxed">
          The Lawyers Collaborative for Diversity (LCD) mission is to make Connecticut and Western Massachusetts a prime location for attorneys of color to practice law and gain access to an abundance of satisfying professional opportunities.      
        </div>
      </div>
      <div className="pb-8">
        <img className="w-full" src="/page_headers_oath.jpg" />
      </div>
      <div className= "max-w-screen-lg flex flex-wrap flex-row m-auto content-center">
        <div className="w-full m-4">
          <h2 className="text-4xl pb-8">Our History</h2>
          <div className="text-2xl">
            LCD began in 2003 as The Connecticut Lawyers Group, in response to the need to advance diversity in Connecticut’s legal profession.
          </div>
          <br />
          <div className="text-lg font-thin">
            Today, we continue to support our members’ efforts to identify, recruit, and retain attorneys of color. However, as the meaning of diversity has broadened, so has our charge. Increasing recruitment, retention, and promotion of a diverse population of attorneys must be cemented as not just good social policy, but as a necessary practice.

  The students and professionals that have participated in our programs over the years have gone on to have very successful careers. Whether they are practicing at a law firm, within a corporation, or for a government agency, our program participants credited LCD’s programs with helping to advance their careers.

  We will continue to champion the development of future lawyers from diverse backgrounds and support our member organizations in creating environments that are authentically inclusive.
          </div>
        </div>
        <div className="w-full m-4">
          <h2 className="text-4xl pb-2">Meet our Team</h2>
        </div>
        <div className="m-auto justify-center flex text-center pb-4">
            <MemberCard member={executiveDirector} isExec={true} />
            <MemberCard member={operationsManager} isExec={true} />
        </div>
        <div className="w-full m-4">
          <h2 className="text-4xl pb-2">Executive Committee</h2>
        </div>
        <div className="m-auto justify-center flex flex-wrap text-center pb-4">
          {execCommittee.map((execMember, _) => {
            return ( 
              <MemberCard key={execMember.name} member={execMember} isExec={true} />
            )
          })}
        </div>
        <div className="w-full m-4">
          <h2 className="text-4xl pb-4">Board of Directors</h2>
          <span className="text-lg font-thin">
            The LCD Board of Directors is a collective of like-minded individuals who are committed to being catalysts for change in the legal profession. Comprised of leaders from our member organizations and representative of the diversity we want to see throughout Connecticut, our board members have chosen to take an active role in ensuring the success of our overall mission and goals.
          </span>
        </div>
        <div className="m-auto pb-10 justify-center flex flex-wrap text-center">
          {boardOfDirectors.map((bodMember, _) => {
            return ( 
              <MemberCard key={bodMember.name} member={bodMember} isExec={false} />
            )
          })}
        </div>
        <div className="w-full m-4">
          <h2 className="text-4xl pb-4">Members</h2>
        </div>
        <div className="m-auto pb-10 justify-center flex flex-wrap text-center">
          {memberEntities.map((entity, _) => {
            return ( 
              <EntityCard key={entity.name} entity={entity} />
            )
          })}
        </div>
        <div className="w-full m-4">
          <h2 className="text-4xl pb-4">Affiliated Organizations</h2>
        </div>
        <div className="m-auto pb-10 justify-center flex flex-wrap text-center">
          {affiliateOrganizations.map((entity, _) => {
            return ( 
              <EntityCard key={entity.name} entity={entity} />
            )
          })}
        </div>
        <div className="w-full m-4">
          <h2 className="text-4xl pb-4">Affiliated Law Schools</h2>
        </div>
        <div className="m-auto pb-10 justify-center flex flex-wrap text-center">
          {lawSchools.map((entity, _) => {
            return ( 
              <EntityCard key={entity.name} entity={entity} />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const GET_ABOUT_INFO = gql`
    query GetAboutInfo {
      members(first: 100) {
        nodes {
          member_details {
            category
            description
            email
            phoneNumber
            headshotImage {
              sourceUrl
            }
            lcdPositionTitle
          }
          title
        }
      }
      affiliateEntities(first: 100, where: {orderby: {field: TITLE, order: ASC}}) {
        nodes {
          affiliate_entities {
            fieldGroupName
            type
            url
            logo {
              sourceUrl
            }
          }
          title
        }
      }
    }
  `
  
  const response = await client.query({
    query: GET_ABOUT_INFO
  });

  // Once we get the response back, we need to traverse it to pull out the 
  // data we want to pass into the HomePage
  const members = response?.data?.members?.nodes; 
  const affiliateEntities = response?.data?.affiliateEntities?.nodes;

  return {
    props: {
      members,
      affiliateEntities
    }
  }
}