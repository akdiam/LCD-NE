const BOARD_OF_DIRECTORS = 'board_of_directors';
const OPERATIONS_MANAGER = 'operations_manager';
const EXECUTIVE_DIRECTOR = 'executive_director';
const EXECUTIVE_COMMITTEE = 'executive_committee';
const EXECUTIVE_COMMITTEE_ORDER = {
  'President': 0,
  'President Elect': 1,
  'Treasurer': 2,
  'Secretary': 3
};

export const parseMembers = (members) => {
  let boardOfDirectors = [];
  let execCommittee = [];
  let executiveDirector = {};
  let operationsManager = {};

  members.forEach(member => {
    let name = '';
    let lastName = '';

    switch (member.member_details.category) {
      case BOARD_OF_DIRECTORS:
        name = member.title;
        lastName = getLastName(member.title);
        boardOfDirectors.push(makeDeepCopy(member.member_details, name, lastName));
        break;
      case EXECUTIVE_COMMITTEE:
        name = member.title;
        execCommittee.push(makeDeepCopy(member.member_details, name, lastName));
        break;
      case OPERATIONS_MANAGER:
        name = member.title;
        operationsManager = makeDeepCopy(member.member_details, name, lastName);
        break;
      case EXECUTIVE_DIRECTOR:
        name = member.title;
        executiveDirector = makeDeepCopy(member.member_details, name, lastName);
        break;
    }
  });

  boardOfDirectors = boardOfDirectors.sort((a, b) => {
    const nameA = a.lastName;
    const nameB = b.lastName;
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });

  execCommittee = execCommittee.sort((a, b) => {
    const posA = EXECUTIVE_COMMITTEE_ORDER[a.lcdPositionTitle];
    const posB = EXECUTIVE_COMMITTEE_ORDER[b.lcdPositionTitle]; 
    if (posA < posB) return -1;
    if (posA > posB) return 1;
    return 0;
  })

  return {
    executiveDirector,
    operationsManager,
    execCommittee,
    boardOfDirectors
  };
}

const makeDeepCopy = (member, name, lastName) => {
  let deepCopy = JSON.parse(JSON.stringify(member));
  deepCopy.name = name;
  deepCopy.lastName = lastName;
  return deepCopy;
}

const getLastName = (name) => {
  return name.split(/[ ,]+/).pop();
}