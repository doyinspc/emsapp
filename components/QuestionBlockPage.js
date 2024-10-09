import React, { useEffect, useState } from 'react'
import QuestionBlock from './QuestionBlock'
import { Appbar, FAB, useTheme } from 'react-native-paper'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { customStyles } from '../constants/Styles';
import Page from './Page';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircleChevronLeft, faCircleChevronRight } from '@fortawesome/free-solid-svg-icons';
import usePostHook from '../app/db/usePostHook';
import { GlobalContext } from './GlobalContextProvider';

const BOTTOM_APPBAR_HEIGHT = 80;
const MEDIUM_FAB_HEIGHT = 56

const  QuestionBlockPage = (props) => {
    const {id, questions, is_complete, answers, work, score} = props
    const {globalParams, updateGlobalParams} = React.useContext(GlobalContext)

    const {question:saved_question} = globalParams

    const [rows, setrows] = useState({})
    const [numbers, setnumbers] = useState([])
    const [answer, setanswer] = useState({})
    const [active_number, setactive_number] = useState(0)
    let db = ''

    const {data, isLoading, error, msg, load:post} = usePostHook({db, table:'test_banks' , queryType:'update'});

 
    useEffect(() => {
        let rows = {}
        let numb = []
        questions.forEach(element=>{
            const {data, question} = element
            const {title} = data
            question.forEach(question_rows => {
                let {instructioncontent, instructiontitle, instructioninstruction, instructionmedia, questions} = question_rows
                Object.keys(questions).forEach(question_id => {
                    numb.push(question_id)
                    let headers = {}
                    headers.title = title
                    headers.instructioncontent = instructioncontent
                    headers.instructionmedia = instructionmedia
                    headers.instructiontitle = instructiontitle
                    headers.instructioninstruction = instructioninstruction
                    rows[question_id] = {...questions[question_id]}
                    rows[question_id].headers = headers 
                });
            });
        })
        setrows(rows)
        setnumbers(numb)
        setactive_number(numb[0])
        console.log(work)
        if(score > 0) setanswer(JSON.parse(work))
    }, [questions])
    const onNext= () =>{
        let n = [...numbers]
        let index = n.findIndex(rw => rw == active_number)
        if(index > -1){
            //greater than 0 
            if(index < n.length){setactive_number(n[index + 1])}
            else{}
        }else{
            //do nothinf
        }
    }
    const onPrev= () =>{
        let n = [...numbers]
        let index = n.findIndex(rw => rw == active_number)
        if(index > -1){}
        else{setactive_number(n[index - 1])}
    }
    const setAnswers = (e, f) =>{
        let a = {...answer}
        a[e] = f
        setanswer(a)
    }
    const submitTest = async () =>{
        let total_answer_array = 0;
        
        await Object.keys(answer).forEach(element => {
            let my_answer = answer[element]
            let correct_answer = answers[element]
            if(my_answer == correct_answer[0]){
                total_answer_array = total_answer_array + 1;
            }   
        });

        let score = total_answer_array > 0 && Object.keys(answers).length > 0 ? total_answer_array / Object.keys(answers).length : 0
        await post({id:id, score:score, work:JSON.stringify(answer)})

        let saved_q = {...saved_question}
        saved_q['score'] = score;
        saved_q['work'] = JSON.stringify(answer);
        await updateGlobalParams(saved_q)
    }

    const { bottom } = useSafeAreaInsets();
    const theme = useTheme();

  return (
    <React.Suspense>
        <Page>
        {Object.keys(rows).map((key, indx)=>{
            if(key == active_number){
                const prop = rows[key] 
                const correct_answer = answers[key] || ''
                const ans = answer.hasOwnProperty(key) ? answer[key] : null
                return <QuestionBlock
                    key={key}
                    data={prop} 
                    id={key}
                    is_complete={is_complete} 
                    answer={ans} 
                    correct_answer={correct_answer[0]}
                    num={indx + 1}
                    numlen={numbers.length}
                    onNext={()=>onNext()}
                    onPrev={()=>onPrev()}
                    setAnswer={(e)=>setAnswers(key , e)}
                />
            }
        })
      }
      </Page>
      <Appbar
      style={[
        customStyles.bottom,
        {
          height: BOTTOM_APPBAR_HEIGHT + bottom,
          backgroundColor: theme.colors.elevation.level2,
        },
      ]}
      safeAreaInsets={{ bottom }}
    >
      <Appbar.Action icon={()=><FontAwesomeIcon size='3x' icon={faCircleChevronLeft} />} onPress={() =>onPrev()} />
      <Appbar.Action icon={()=><FontAwesomeIcon size='3x' icon={faCircleChevronRight} />} onPress={() =>onNext()} />
      <FAB
        mode="flat"
        size="medium"
        icon="plus"
        onPress={() => submitTest()}
        style={[
          customStyles.fab,
          { top: (BOTTOM_APPBAR_HEIGHT - MEDIUM_FAB_HEIGHT) / 2 },
        ]}
      />
    </Appbar>
    </React.Suspense>
  )
}

export default React.memo(QuestionBlockPage)