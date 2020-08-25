export const getStream = async (constraints?: MediaStreamConstraints) => {
  const stream = await navigator.mediaDevices.getUserMedia(constraints)
  if (stream) {
    return stream
  } else {
    console.error('マイクを取得できませんでした')
    return null
  }
}
