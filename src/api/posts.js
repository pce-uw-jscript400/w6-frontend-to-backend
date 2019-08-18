const { REACT_APP_API_DOMAIN } = process.env
const BASE_URL = REACT_APP_API_DOMAIN


const PostData = async () => {

  const response = await fetch(`${BASE_URL}/users/:userId/posts`)
  const json = await response.json()

  return json
}

export default PostData