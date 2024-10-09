import { View, Text, Pressable } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { Caption, Paragraph, Subheading } from 'react-native-paper'
import { customStyles } from '../constants/Styles'
import RenderHTML from 'react-native-render-html'
import { useNavigation } from 'expo-router'

const QuestionBlock = (props) => {
    const {data, id, answer, correct_answer, num, numlen, is_complete} = props
    const {headers, question, options } = data
    const {title, instructioncontent, instructioninstruction, instructionmedia, instructiontitle} = headers

    let style = customStyles.default_option
    

    console.log(answer, correct_answer)
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
        title: 'Question ' + num + ' of ' + numlen,
        });
    }, [navigation]);

  return (
    <View>
        <Caption>{title}</Caption>
        {typeof instructiontitle == 'string' && instructiontitle.length > 0 && <Subheading>{instructiontitle}</Subheading>}
        {typeof instructioninstruction == 'string' && instructioninstruction.length > 0 && 
        <Paragraph>
            <RenderHTML source={{html:instructioninstruction || ''}} />
        </Paragraph>
        }
        {typeof instructioncontent == 'string' && instructioncontent.length > 0 && 
        <Paragraph>
            <RenderHTML source={{html:instructioncontent || ''}} />
        </Paragraph>
        }
        {typeof question == 'string' && question.length > 0 && 
        <Paragraph style={customStyles.question}>
            <RenderHTML source={{html:question || ''}} />
        </Paragraph>
        }

        {typeof options == 'object'  && 
        <Paragraph>
            {
                Object.keys(options).map(rw=>{
                    let {value, type} = options[rw]
                    if(answer == rw && correct_answer == rw && is_complete){
                        style = customStyles.correct_option
                    }
                    else if(answer == rw && correct_answer != rw && is_complete){style = customStyles.wrong_option}
                    else if(answer == rw && !is_complete){style = customStyles.select_option}
                    else{style = customStyles.default_option}
                    return <Pressable 
                        style={style}
                        onPress={()=>props.setAnswer(rw)}
                        >
                        <RenderHTML source={{html:value || ''}} />
                    </Pressable>
                })
            }
            <RenderHTML source={{html:options || ''}} />
        </Paragraph>
        }
    </View>
  )
}

export default QuestionBlock