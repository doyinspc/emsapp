import React, {useEffect} from 'react';
import Loading from '../../components/Loading';
import useGetHook from '../db/useGetHook';
import { router } from 'expo-router';
import ListScheme from '../../components/ListSchemes';
import { customStyles } from '../../constants/Styles';
import PageFixed from '../../components/PageFixed';
import { View } from 'react-native';
import { GlobalContext } from '../../components/GlobalContextProvider';
import { Appbar, List } from 'react-native-paper';
import Page from '../../components/Page';

const Schemes = () => {

    const {globalParams, updateGlobalParams} = React.useContext(GlobalContext)
    
    const {subject, school, term, student, clasz} = globalParams || {}
    const {subjectid, subjectname} = subject || ''
    const {id:schoolid} = school || ''
    const {termid} = term || ''
    const {id:studentid} = student || ''
    const {claszid} = clasz || ''
    
    let db = ''
    const {data, isLoading, error, msg, load} = useGetHook({db, table:'students', queryType:'select_active_schemes'})
    
    useEffect(() => load({
        studentid,
        schoolid,
        claszid,
        subjectid:subjectid,
        termid
    }), [studentid])
  
    const handleSubmit = ()=> load({
        studentid,
        schoolid,
        claszid,
        subjectid:subjectid,
        termid
    })
    
    let schemes = {}
    if(data && Array.isArray(data) && data.length > 0){
        data.forEach(element => {
            const {tid} = element
            if(schemes.hasOwnProperty(tid))
            {
                schemes[tid]['data'].push(element)
            } else{
                schemes[tid] = {}
                schemes[tid]['info'] = {...element}
                schemes[tid]['data'] = []
                schemes[tid]['data'].push(element)
            }
        });
    }

  return(
    <PageFixed>
        <Appbar.Header>
            <Appbar.BackAction onPress={()=>router.replace('./auth')} />
            <Appbar.Content titleStyle={customStyles.headerTitleStyle} title ={subjectname} />
            <Appbar.Action icon='home' onPress={()=>router.push("auth")} />
            <Appbar.Action icon='refresh' onPress={()=>handleSubmit()} />
        </Appbar.Header>
        <React.Suspense fallback={<Loading />}>
        <Page>
            {!isLoading ?
            <>
            {schemes 
            && Array.isArray(Object.keys(schemes)) 
            && Object.keys(schemes).length > 0 
            && <ListScheme data={schemes} />}
            {error && <Text>{error}</Text>}
            {msg && <Text>{msg}</Text>}
            </>:
            <Loading />} 
        </Page>
    </React.Suspense>
    </PageFixed>
)};

export default Schemes;