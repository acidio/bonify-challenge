const YOUTUBE_API_URI = 'https://www.googleapis.com/youtube/v3';
const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY as string;

interface VideosByLocationParams {
  location: string;
  locationRadius?: string;
}

type GetVideosByLocation = ({
  location,
  locationRadius
}: VideosByLocationParams) => any;

export const getVideosByLocation: GetVideosByLocation = async ({
  location,
  locationRadius = '50km'
}) => {
  try {
    const endpoint = `${YOUTUBE_API_URI}/search?part=snippet&location=${location}&locationRadius=${locationRadius}&maxResults=10&order=date&type=video%2Clist&key=${GOOGLE_API_KEY}`;
    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }

    const json = await response.json();

    return json;
  } catch (error) {
    console.log(
      'There has been a problem with your fetch operation: ',
      error.message
    );
  }
};
