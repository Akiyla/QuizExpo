import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

// Definindo as perguntas do quiz
const questions = [
  { question: 'Personas são a representação da personalidade do usuário, comummente tomando forma de criaturas mitologicas.', answer: true, image: 'https://i1.sndcdn.com/artworks-000672672571-nbinu8-t500x500.jpg' },
  { question: 'Um usuário comum de personas pode ter várias formas de sua persona.', answer: true , image: 'https://preview.redd.it/i-want-to-see-your-fan-made-personas-v0-6iz271rc6vvc1.jpeg?width=640&crop=smart&auto=webp&s=448a454c19353ede26cbee9f0dfcc4b1d451f35b' },
  { question: 'Sombras são personas, mas em um estado alterado.', answer: false, image: 'https://preview.redd.it/why-are-there-only-twelve-shadows-v0-d7hzahpigfid1.jpg?width=480&format=pjpg&auto=webp&s=5f35675d1951c82ef98b55013b141d337b1ecd1c'},
  { question: 'Uma "Wildcard" ou coringa, é um usuário capaz de sumonar diversas personas em combate.', answer: true , image: 'https://cdn.discordapp.com/attachments/1290655713382764558/1364008971236540517/image.png?ex=68081bd8&is=6806ca58&hm=6788d490c8290a704fa60f7012ba3042ddc2ceaa0a5bc9459c25e383444eb184&' },
  { question: 'Yukari Takeba, é um exemplo de Wildcard em Persona 3.', answer: false , image: 'https://media1.tenor.com/m/lRlTffJwLSYAAAAd/persona-3-persona-3-reload.gif' },
  { question: 'A Sala de veludo é um lugar abstrato, mudando conforme a jornada de quem a visita.', answer: true , image: 'https://media1.tenor.com/m/bgiPmC3SJpQAAAAC/dan%C3%A7ando-bboying-nicholas-andteam.gif' },
  { question: 'Makoto Yuki é o unico Wildcard capaz de usar a persona Thantanos.', answer: false , image: 'https://media1.tenor.com/m/p9jlZCw57IYAAAAC/persona-3-thanatos-thanatos-makoto.gif' },
  { question: 'Personas podem ser sumonadas de diversas formas. Estas sendo: Enfrentando a morte, Arrancando sua máscara, e usando seu celular.', answer: false , image: 'https://media1.tenor.com/m/YTWHmcGTfu8AAAAC/persona-persona3.gif' },
  { question: 'Personas são um tipo de demonio.', answer: false },
  { question: 'As "Arcanas, baseadas no Tarô, fortalecem as personas de um Wildcard por meio de Laços sociais que representam as arcanas.', answer: true, image: 'https://cdn.discordapp.com/attachments/1290655713382764558/1364006609562632303/image.png?ex=680819a5&is=6806c825&hm=c35b32632207689a584a4e6539ed994d0b93ff6d0d880e37a0f71c91bc416607&' },
];

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Persona Quiz!</Text>
      <Button title="Iniciar Quiz" onPress={() => navigation.navigate('Quiz')} />
    </View>
  );
};

const QuizScreen = ({ navigation }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [userAnswer, setUserAnswer] = useState(null);

  // Função para verificar a resposta
  const handleAnswer = (answer) => {
    if (!answered) {
      setAnswered(true);
      setUserAnswer(answer);

      if (answer === questions[currentQuestion].answer) {
        setScore(score + 1);
      }
    }
  };

  // Resetar o estado quando a pergunta mudar
  useEffect(() => {
    setAnswered(false);
    setUserAnswer(null);
  }, [currentQuestion]);

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      navigation.navigate('Result', { score });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{questions[currentQuestion].question}</Text>
      <Image
        source={{ uri: questions[currentQuestion].image }}
        style={styles.image}
      />
      <View style={styles.buttonsContainer}>
        <Button
          title="Verdadeiro"
          onPress={() => handleAnswer(true)}
          disabled={answered}
        />
        <Button
          title="Falso"
          onPress={() => handleAnswer(false)}
          disabled={answered}
        />
      </View>

      {answered && (
        <View style={styles.buttonsContainer}>
          <Button title="Próxima" onPress={handleNextQuestion} />
        </View>
      )}

      {answered && (
        <Text style={styles.feedback}>
          {userAnswer === questions[currentQuestion].answer
            ? 'Você acertou!'
            : 'Você errou!'}
        </Text>
      )}
    </View>
  );
};

const ResultScreen = ({ route }) => {
  const { score } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz Concluído!</Text>
      <Text style={styles.score}>Sua pontuação: {score}/10</Text>
      <Button title="Jogar novamente" onPress={() => route.navigation.navigate('Quiz')} />
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Quiz" component={QuizScreen} />
        <Stack.Screen name="Result" component={ResultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  question: {
    fontSize: 18,
    marginBottom: 20,
  },
  image: {
    width: 500,
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  score: {
    fontSize: 20,
    marginTop: 20,
  },
  buttonsContainer: {
    marginTop: 10,
    width: '80%',
  },
  feedback: {
    marginTop: 10,
    fontSize: 16,
    color: 'blue',
  },
});