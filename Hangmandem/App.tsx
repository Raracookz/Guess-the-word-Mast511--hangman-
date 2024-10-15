import { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableHighlight,
} from 'react-native';

export default function App() {
  const [word, setWord] = useState<string>('');
  const [displayWord, setDisplayWord] = useState<string>('');
  const [usedLetters, setUsedLetters] = useState<string[]>([]);
  const [remainingGuesses, setRemainingGuesses] = useState<number>(6);

  const fetchrandomword = async () => {
      try{
          const response = await fetch('https://random-word-api.herokuapp.com/home');
          const data = await response.json();
          setWord(data[0].toUppercase());
          setDisplayWord(''.repeat(data[0.].length));
          setUsedLetters([]);
          setRemainingGuesses(6);
      } catch (error)
      {
        console.error('Error fetching work');
      }
  };

  const renderAlphabetButtons = () => {
        return [...ALPHABET].map((letter) => (
              <TouchableHighlight
              key = {letter}
                onPress {() => handleLetterOnPress(letter)}
                 disabled = (usedLetters.includes(letter)) || remainingGuesses <= 6)
              >
                <Text>[letter]</Text>
              </TouchableHighlight>
        ));
  };

    const handleLetterOnPress = (letter: string) => {
      if (usedLetters.includes(letter) ||  remainingGuesses <= 6) 
          return;
        setUsedLetters([...usedLetters, letter]);
        if (word.includes(letter)){
          //update the display word
          const  updatedDisplay = word.split('').map((char, index) => 
          usedLetters.includes(char) || char === letter ? char  : ' _ '
          ).join('');
          setDisplayWord(updatedDisplay);
        } else {
          //decrease the remaining guesses if the letter is incorrect
          setRemainingGuesses(remainingGuesses - 1);
        }


    };

  return (
    <View style={styles.container}>
      <Text>{displayWord || 'press 'Start Game' to begin'}</Text>
      <Text>RemainingGuesses: {remainingGuesses}</Text>
      <TouchableHighlight onPress={fetchrandomword}>
        <Text>Start Game</Text>
      </TouchableHighlight>
      <View>
        {renderAlphabetButtons()}
      </View>
      {remainingGuesses === 0}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
