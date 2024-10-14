import React, {useEffect} from 'react';
import ListSubject from '../../components/ListSubjects';
import Loading from '../../components/Loading';
import useGetHook from '../db/useGetHook';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import PageFixed from '../../components/PageFixed';
import Page from '../../components/Page';
import { customStyles } from '../../constants/Styles';
import { View } from 'react-native';
import { Appbar } from 'react-native-paper';
import { GlobalContext } from '../../components/GlobalContextProvider';

const Subjects = () => {
    const nav = useNavigation()
    const params = useLocalSearchParams()
    const {globalParams, updateGlobalParams} = React.useContext(GlobalContext)
    const {student, school, clasz} = globalParams
    const {id:studentid,} = student || ''
    const {id:schoolid } = school || ''
    const {claszid } = clasz || ''
    
    let db =''
    const {data, isLoading, error, msg, load} = useGetHook({db, table:'students', queryType:'select_active_subjects'})
    
    useEffect(() => load({
        'studentid':studentid,
        'schoolid':schoolid,
        'claszid':claszid
    }), [studentid])
  
    const handleSubmit = ()=> load({
        'studentid':studentid,
        'schoolid':schoolid,
        'claszid':claszid
    })
    

  return(
    <React.Suspense fallback={<Loading />}>
        <PageFixed>
        <Appbar.Header>
            <Appbar.BackAction onPress={()=>nav.goBack()} />
            <Appbar.Content titleStyle={customStyles.headerTitleStyle} title ='Subjects' />
            <Appbar.Action icon='home' onPress={()=>router.replace('auth')} />
            <Appbar.Action icon='refresh' onPress={()=>handleSubmit()} />
        </Appbar.Header>
        <Page>
                    {!isLoading ?
                    <>
                    {data 
                    && Array.isArray(data) 
                    && data.length > 0 
                    && data.map((props, indx) =><ListSubject key={indx} data={props} params={params} />)}
                    {error && <Text>{error}</Text>}
                    {msg && <Text>{msg}</Text>}
                    </>:
                    <Loading />} 
        </Page>
    </PageFixed>
    </React.Suspense>
)};

export default Subjects;