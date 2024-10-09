import React, {useEffect} from 'react';
import ListSubject from '../../components/ListSubjects';
import Loading from '../../components/Loading';
import useGetHook from '../db/useGetHook';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import PageFixed from '../../components/PageFixed';
import { customStyles } from '../../constants/Styles';
import { View } from 'react-native';
import { Appbar } from 'react-native-paper';
import { GlobalContext } from '../../components/GlobalContextProvider';

const Subjects = () => {
    const nav = useNavigation()
    const params = useLocalSearchParams()
    const {globalParams, updateGlobalParams} = React.useContext(GlobalContext)
    const {student, school, clasz} = globalParams
    const {id:studentid, schoolid, claszid} = params
    
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
    <PageFixed>
        <Appbar.Header>
            <Appbar.BackAction onPress={()=>nav.goBack()} />
            <Appbar.Content titleStyle={customStyles.headerTitleStyle} title ='Subjects' />
            <Appbar.Action icon='home' onPress={()=>router.replace('auth')} />
            <Appbar.Action icon='refresh' onPress={()=>handleSubmit()} />
        </Appbar.Header>
        <View style={customStyles.ListPage}>
            <View style={customStyles.ListPageTop}>
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
            </View>
        </View>
    </PageFixed>
)};

export default Subjects;