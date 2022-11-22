const MEMBER_ENTITY = 'member_entity';
const AFFILIATE_ORGANIZATION = 'affiliate_organization';
const LAW_SCHOOL = 'law_school'

export const parseEntities = (affiliateEntities) => {
  let memberEntities = [];
  let affiliateOrganizations = [];
  let lawSchools = [];

  affiliateEntities.forEach(entity => {
    switch (entity.affiliate_entities.type) {
      case MEMBER_ENTITY:
        memberEntities.push(makeDeepCopy(entity.affiliate_entities, entity.title));
        break;
      case AFFILIATE_ORGANIZATION:
        affiliateOrganizations.push(makeDeepCopy(entity.affiliate_entities, entity.title));
        break;
      case LAW_SCHOOL:
        lawSchools.push(makeDeepCopy(entity.affiliate_entities, entity.title));
        break;
    }
  });

  return {
    memberEntities,
    affiliateOrganizations,
    lawSchools
  };
};

const makeDeepCopy = (entity, name) => {
  let deepCopy = JSON.parse(JSON.stringify(entity));
  deepCopy.name = name;
  return deepCopy;
}