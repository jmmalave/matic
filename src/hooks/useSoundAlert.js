import {useAudio} from 'react-use-audio'
import _Audio from '@/audio/success.ogg'



export function useSoundAlert(){
	const audio = useAudio(_Audio)
	return audio
}