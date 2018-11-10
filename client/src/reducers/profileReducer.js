import { GET_PROFILE, GET_PROFILES, PROFILE_LOADING, GET_EXPERIENCE, GET_EDUCATION, CLEAR_CURRENT_PROFILE } from '../actions/types'

const initialState = {
  profile: null,
  profiles: null,
  experience: null,
  education: null,
  loading: false
}

export default function (state = initialState, action) {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      }
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        loading: false
      };

    case GET_EXPERIENCE:
      return {
        ...state,
        experience: action.payload,
        loading: false
      }
    case GET_EDUCATION:
      return {
        ...state,
        education: action.payload,
        loading: false
      }
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null
      }
    default:
      return state;
  }
}
