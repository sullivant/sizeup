export interface AIResponse {
  response: string
  usage: {
    prompt_tokens: number,
    completion_tokens: number,
    total_tokens: number,
  }
}

export interface AIAudioResponse {
  audio: string
}
