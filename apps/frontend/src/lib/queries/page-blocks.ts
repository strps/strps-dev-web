import { gql } from '@apollo/client'

export const PAGE_BLOCK_FIELDS = gql`
  fragment PageHeroFields on PageHeroBlock {
    blockType
    name
    label
    description
    location {
      city
      region
    }
    status {
      isAvailable
      label
    }
    email
    heroLinks: links {
      link {
        type
        newTab
        url
        label
        appearance
        reference {
          relationTo
          value {
            ... on Page {
              slug
            }
          }
        }
      }
    }
    backgroundImage {
      url
      alt
      width
      height
    }
    section {
      container
      section_id
      backgroundContainer
      theme
      background
      backgroundImage {
        url
        alt
      }
    }
  }

  fragment PageAboutFields on PageAboutBlock {
    blockType
    title
    summary
    image {
      url
      alt
      width
      height
    }
    section {
      container
      section_id
      backgroundContainer
      theme
      background
    }
  }

  fragment PageSkillsFields on PageSkillsBlock {
    blockType
    title
    subtitle
    skillGroups {
      name
      icon
      keywords {
        keyword
      }
    }
    section {
      container
      section_id
      backgroundContainer
      theme
      background
    }
  }

  fragment PageProjectsFields on PageProjectsBlock {
    blockType
    title
    populateBy
    limit
    selectedProjects {
      id
      title
      slug
      heroImage {
        url
        alt
      }
      meta {
        description
      }
      links {
        liveSite
        github
      }
      techStack {
        name
      }
    }
    githubUrl
    section {
      container
      section_id
      backgroundContainer
      theme
      background
    }
  }

  fragment PageExperienceFields on PageExperienceBlock {
    blockType
    title
    positions {
      company
      position
      startDate
      endDate
      summary
      highlights {
        highlight
      }
    }
    section {
      container
      section_id
      backgroundContainer
      theme
      background
    }
  }

  fragment PageContactFields on PageContactBlock {
    blockType
    title
    description
    email
    contactLinks: links {
      link {
        type
        newTab
        url
        label
        appearance
        reference {
          relationTo
          value {
            ... on Page {
              slug
            }
          }
        }
      }
    }
    section {
      container
      section_id
      backgroundContainer
      theme
      background
    }
  }
`

export const GET_PAGE_BY_SLUG = gql`
  ${PAGE_BLOCK_FIELDS}
  query GetPageBySlug($slug: String!, $draft: Boolean) {
    Pages(
      where: { slug: { equals: $slug } }
      limit: 1
      draft: $draft
    ) {
      docs {
        id
        title
        slug
        layout {
          ...PageHeroFields
          ...PageAboutFields
          ...PageSkillsFields
          ...PageProjectsFields
          ...PageExperienceFields
          ...PageContactFields
        }
        meta {
          title
          description
          image {
            url
          }
        }
      }
    }
  }
`

export const GET_HOME_PAGE = gql`
  ${PAGE_BLOCK_FIELDS}
  query GetHomePage($draft: Boolean) {
    Pages(
      where: { slug: { equals: "home" } }
      limit: 1
      draft: $draft
    ) {
      docs {
        id
        title
        slug
        layout {
          ...PageHeroFields
          ...PageAboutFields
          ...PageSkillsFields
          ...PageProjectsFields
          ...PageExperienceFields
          ...PageContactFields
        }
      }
    }
  }
`
