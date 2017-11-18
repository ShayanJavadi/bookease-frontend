import React from "react";
import { View, Text, Image } from "react-native";
import { styles } from "./styles";

const {
  questionsWrapperStyle,
  questionsTitleWrapperStyle,
  questionsTitleStyle,
  questionWrapperStyle,
  questionUsernameStyle,
  questionUserAvatarStyle,
  questionTextStyle,
  questionRecipientStyle,
  questionDateWrapperStyle,
  questionDateStyle,
  noQuestionsWrapperStyle,
  noQuestionsStyle,
} = styles;

const questions = [
  {
    username: "Renato Principe",
    userAvatar: "https://media.licdn.com/media/AAEAAQAAAAAAAAR6AAAAJDVjYjI4MDFlLTBkNDAtNDE1Ny04NjYyLWViOWU3YzljNGNhZQ.jpg",
    text: "Does this book go over clowns, farming, and algorithms?",
    recipient: null,
    date: "1h",
  },
  {
    username: "Shayan Javadi",
    userAvatar: "https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAA0-AAAAJDFjZWI5ZjE2LTljMTktNDA5NS04NmIzLTcyYTI0YzdmODRhZQ.jpg",
    text: "Yes it does!",
    recipient: "Renato Principe",
    date: "32m",
  },
];

const fetchQuestions = () => {
  if (questions) {
    return questions.map((question, index) => (
      <View style={questionWrapperStyle} key={index}>
        <View style={{ flex: 1 }}>
          <Image
            style={questionUserAvatarStyle}
            source={{ uri: question.userAvatar }}
          />
        </View>
        <View style={{ flex: 3.4 }}>
          <Text style={questionUsernameStyle}>{question.username}</Text>
            <Text style={questionTextStyle}><Text style={questionRecipientStyle}>
              {question.recipient ? `\@${question.recipient} ` : null}
            </Text>
            {question.text}
          </Text>
        </View>
        <View style={questionDateWrapperStyle}>
          <Text style={questionDateStyle}>{question.date}</Text>
        </View>
      </View>
    ));
  }

  return (
    <View style={noQuestionsWrapperStyle}>
      <Text style={noQuestionsStyle}>{
        'Have questions\? Press the "ASK" button to ask them.' // eslint-disable-line quotes
      }</Text>
    </View>
  );
}


const Questions = () => (
  <View style={questionsWrapperStyle}>
    <View style={questionsTitleWrapperStyle}>
      <View style={{ flex: 1 }}>
        <Text style={questionsTitleStyle}>Questions & Answers</Text>
      </View>
    </View>
   {fetchQuestions()}
  </View>
);


export default Questions;
