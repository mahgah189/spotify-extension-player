import * as canvas from "./_canvas_pb.js";

const canvasApiUrl = "https://gew1-spclient.spotify.com/canvaz-cache/v0/canvases";

const getCanvas = async (tracks, accessToken) => {

  // build protobuf message for canvas API
  let canvasRequest = new canvas.CanvasRequest();
  for (const track of tracks) {
    let spotifyTrack = new canvas.CanvasRequest.Track();
    spotifyTrack.setTrackUri(track.uri);
    canvasRequest.addTracks(spotifyTrack);
  };
  let requestBytes = canvasRequest.serializeBinary();

  const headers = {
    "accept": "application/protobuf",
    "content-type": "application/x-www-form-urlencoded",
    "accept-language": "en",
    "accept-encoding": "gzip, deflate, br",
    "authorization": `Bearer ${accessToken}`,
  }

  try { 
    const response = await fetch(canvasApiUrl, {
      method: "POST",
      headers: headers,
      body: requestBytes
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    };

    const data = await response.arrayBuffer();
    console.log(canvas.CanvasResponse.deserializeBinary(new Uint8Array(data)).toObject())
    return canvas.CanvasResponse.deserializeBinary(new Uint8Array(data)).toObject();
  } catch (error) {
    console.error(error);
  }
}

export default getCanvas;