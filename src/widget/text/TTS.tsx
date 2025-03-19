'use client';

import { Player } from '@/components/file/Player';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import googleTTS from 'google-tts-api';
import axios from 'axios';
import { tts } from '@/lib/tts';

export const TextToSpeechBlock = () => {
	const [text, setText] = useState('');
	const [speechUrl, setSpeechUrl] = useState<string | null>(null);
	console.log(speechUrl);

	return (
		<div>
			{speechUrl && (
				<div>
					<Player type='audio' src={speechUrl} />
				</div>
			)}
			<Textarea value={text} onChange={e => setText(e.currentTarget.value)} />
			<Button
				onClick={async () => {
					const url = await tts({ text, language: 'ru' });

					setSpeechUrl(url);
					// const url = googleTTS.getAudioUrl(text, {
					// 	lang: 'ru',
					// 	slow: false,
					// 	host: 'https://translate.google.com',
					// });
					// const buffer = await axios.get(url, { responseType: 'arraybuffer' });
					// const blob = new Blob([buffer.data], { type: 'audio/wav' });
					// setSpeechUrl(window.URL.createObjectURL(blob));
				}}
			>
				Перевести
			</Button>
		</div>
	);
};
