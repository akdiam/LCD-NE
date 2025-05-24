import { client } from '../lib/apollo.js';
import { gql } from "@apollo/client";

export function createCommonStaticProps(pageSpecificLogic) {
    return async () => {
        const GET_SOCIALS_LINK = gql`
            query getSocialsLink {
            youtube: social(id: "youtube", idType: SLUG) {
                socials_metadata {
                url
                }
            }
            instagram: social(id: "instagram", idType: SLUG) {
                socials_metadata {
                url
                }
            }
            facebook: social(id: "facebook", idType: SLUG) {
                socials_metadata {
                url
                }
            }
            linkedin: social(id: "linkedin", idType: SLUG) {
                socials_metadata {
                url
                }
            }
            }
      `

    const response = await client.query({
        query: GET_SOCIALS_LINK,
    });
      
      const youtube = response?.data?.youtube?.socials_metadata?.url;
      const instagram = response?.data?.instagram?.socials_metadata?.url;
      const facebook = response?.data?.facebook?.socials_metadata?.url;
      const linkedin = response?.data?.linkedin?.socials_metadata?.url;
      const socials = {
        youtube,
        instagram,
        facebook,
        linkedin
      };

      const pageProps = pageSpecificLogic 
        ? await pageSpecificLogic()
        : { props: {} };
  
      return {
        props: {
          ...pageProps.props,
          socials,
        },
        ...(pageProps.revalidate && { revalidate: pageProps.revalidate }),
      };
    };
  }