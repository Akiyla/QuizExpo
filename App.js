import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

// Definindo as perguntas do quiz
const questions = [
  { question: 'Personas são a representação da personalidade do usuário, comummente tomando forma de criaturas mitologicas.', answer: true },
  { question: 'Um usuário comum de personas pode ter várias formas de sua persona.', answer: true },
  { question: 'Sombras são personas, mas em um estado alterado.', answer: false },
  { question: 'Uma "Wildcard" ou coringa, é um usuário capaz de sumonar diversas personas em combate.', answer: true },
  { question: 'Yukari Takeba, é um exemplo de Wildcard em Persona 3.', answer: false },
  { question: 'A Sala de veludo é um lugar abstrato, mudando conforme a jornada de quem a visita.', answer: true },
  { question: 'Makoto Yuki é o unico Wildcard capaz de usar a persona Thantanos.', answer: false },
  { question: 'Personas podem ser sumonadas de diversas formas. Estas sendo: Enfrentando a morte, Arrancando sua máscara, e usando seu celular.', answer: false },
  { question: 'Personas são um tipo de demonio.', answer: false },
  { question: 'As "Arcanas, baseadas no Tarô, fortalescem as personas de um Wildcard por meio de Laços sociais que representam as arcanas.', answer: true },
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