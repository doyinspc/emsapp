import { Dimensions, StatusBar, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const widthPart = windowWidth / 24
const heightPart = windowHeight / 24
const theme = useTheme()
export const customStyles = StyleSheet.create({
    container:{
        backgroundColor:theme.colors.primaryContainer,
        width:'100%',
        height: '100%',
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center',
        paddingTop: StatusBar.currentHeight,
    },
    rowContainer:{
        flex: 1,
        display:'flex',
        alignItems:'center',
        jusitifyContent: 'center',
        paddingHorizontal: widthPart,
        paddingVertical:heightPart * 2,
        fontFamily:'pacifico'
    },
    rowContainerImg:{
      display:'flex',
      alignItems:'center',
      jusitifyContent: 'center',
      fontFamily:'pacifico'
  },
    scrollview:{
        height:'100vh',
        marginVertical:heightPart,
        marginHorizontal:widthPart,
        paddingBottom: heightPart
        // justifyContent:'center',
        // alignItems:'center'
    },
    safearea:{
        flex:1,
        alignItems:'center',
        jusitifyConten:'center',
        paddingTop: StatusBar.currentHeight,
        backgroundColor:theme.colors.primaryContainer,
    },
    button:{
        alignItems: 'center',
        paddingVertical:5,
        paddingHorizontal:30,
        borderRadius:10,
        backgroundColor:theme.colors.secondary,
        width: widthPart * 20
    },
    labelStyle:{
        fontSize:'1.2rem',
        fontFamily:'sourcesansbold',
        color: theme.colors.onSecondary
    },
    textbox:{
        height: 40,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        marginBottom: heightPart,
        
    },
    logo: {
        width: windowWidth * 0.5,
        height: windowWidth * 0.5,
        marginBottom: 40,
      },
    img: {
       justifyContent:'center',
       alignItems:'center',
        width: windowWidth * 0.5,
        height: windowWidth * 0.5,
        marginBottom: 40,
      },
    textContainer: {
        width: '90%',
        marginVertical: heightPart,
        flex:1,
      },
      loginButtonText: {
        color: 'white',
        fontWeight: 'bold',
      },
      h2:{
        fontFamily:'sourcesansbold',
        fontSize:'2.5rem'
      },
     
      CardContainer:{
        flex:1,
        margin:widthPart,
        paddingHorizontal:widthPart,
        alignContent:'center',
        justifyContent:'flex-start',
      },
      Card:{
        backgroundColor:'#fff',
        width:widthPart * 20
      },
      menuCard:{
        flex:3,
        paddingVertical:heightPart * 2,
        display:'flex',
        flexDirection:'row',
        alignContent:'center',
        justifyContent:'center',
        flexWrap:'wrap',
        gap:2,
      },
      menuCards:{
        backgroundColor:theme.colors.onSurface,
        shadowOpacity:0.5,
        padding:20,
        justifyContent:'space-around',
        alignItems:'center',
        width:widthPart * 6,
        margin:1,
      },
      menuCardFooter:{
        flex: 1,
        display:'flex',
        alignItems:'center',
        jusitifyContent: 'center',
        paddingHorizontal: widthPart,
        paddingVertical:heightPart,
        fontFamily:'pacifico'
    },
      menuCardsText:{
        paddingTop:10,
        fontFamily:'ralewaybold',
        textAlign:'center',
        fontWeight:'bold',
        color:theme.colors.onSecondary
      },
      headerStyle : {
        //backgroundColor: 'darkblue',
      },
      headerTitleStyle : {
        fontWeight: 'bold',
        fontFamily:'josefinbold',
        fontSize: windowWidth > 300 ? 18 : 16,
      },
      banner:{
        fontWeight: 'bold',
        fontFamily:'pacifico'
      },
      headerbox : {
        fontFamily:'josefinregular',
        marginBottom:heightPart,
      },
      paragraph : {
        fontFamily:'nunitoregular',
        marginBottom:heightPart
      },
      listHeader:{
        color:theme.colors.primary,
        fontFamily:'sourcesansbold',
        textTransform:'capitalize',
        textWrap:'wrap'
      },
      caption:{
        fontWeight:'bold'
      },
      title:{
        fontSize: windowWidth > 350 ? 28 : 24,
        fontWeight:'bold',
        marginBottom:10,
        fontFamily:'nunitobold',
        color:theme.colors.primary
      },
      subtitle:{
        fontSize: windowWidth > 350 ? 18 : 16,
        fontWeight:'bold',
        marginBottom:10,
        fontFamily:'pacifico',
        color:theme.colors.secondary
      }, 
      ListPageTop:{
        width:'100%',
        alignItems:'flex-start',
        minHeight:windowHeight
      },
      ListPageButton:{
        height: windowHeight * 0.2
      },
      ListPage:{
        height: windowHeight,
        justifyContent: 'center',
        alignItems:'center',
        width:'100%',
        backgroundColor:theme.colors.backgroundColor
      },
      correct_option:{
        width:'100%',
        paddingHorizontal:widthPart,
        paddingVertical:heightPart,
        backgroundColor:'rgba(21, 153, 71, 0.7)',
        color:'white',
        border:'solid 1px black',
        borderRadius:20
      },
      wrong_option:{
        width:'100%',
        paddingHorizontal:widthPart,
        paddingVertical:heightPart,
        backgroundColor:'rgba(247, 110, 124, 0.5)',
        color:'white',
        border:'solid 1px black',
        borderRadius:20
      },
      select_option:{
        width:'100%',
        paddingHorizontal:widthPart,
        paddingVertical:heightPart,
        backgroundColor:'rgba(2, 30, 102, 0.7)',
        color:'white',
        border:'solid 1px black',
        borderRadius:20
      },
      default_option:{
        width:'100%',
        paddingHorizontal:widthPart,
        paddingVertical:heightPart,
        backgroundColor:'white',
        color:'black',
      },
      question:{
        fontSize:18,
        fontWeight:'bold',
        fontFamily: 'nunitobold'
      },
      loader:{
        width:'100%',
        height:'100%',
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
      },  bottom: {
        backgroundColor: 'aquamarine',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
      },
      fab: {
        position: 'absolute',
        right: 16,
      },
      InfoPage:{
        fontFamily : 'ralewayregular',
        fontSize : 16,
        paddingHorizontal: widthPart
      },
      bgimage:{
        flex:1,
        justifyContent:'center',
        height:'100%',
        width:windowWidth,
      },
      bgimagescreen:{
        backgroundColor:theme.colors.onBackground,
        height:'100%',
        width:windowWidth,
        backgroundColor:'transparent'
      }
})
