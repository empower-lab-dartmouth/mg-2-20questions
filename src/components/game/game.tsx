import "./game.css";
import Stack from '@mui/material/Stack';
import { Link } from "react-router-dom";
import {useRecoilState, useRecoilValue} from "recoil";
import {ButtonSmall} from '../../editor/button-small';
import {READY,GAMING,END} from "../../models/status";
import {status, currentimage, currentnode } from "../../store";
import {aApple, aStrawberry, aDragonfruit, aBanana, qBerry, qRed, aElsa, aOlaf, qHuman, aStatue, aPyramids, qGreen} from "../../database/questions";
import React, { useEffect, useRef, useLayoutEffect } from "react"; 

const Game = () => {

    const [gamestatus, setgamestatus] = useRecoilState(status);
    const [innode, setinnode] = useRecoilState(currentnode);
    const selectedimage = useRecoilValue(currentimage);
    const message = new SpeechSynthesisUtterance();
    message.text = innode.question;

    const isFirst = useRef(true);

    useEffect(() => {
        if(isFirst.current == true){
            isFirst.current = false;
        }
        else{
         window.speechSynthesis.speak(message);
        }
    },[innode])
    
    const next = (input: string) => {
       var nextpointer = innode; 
       if(input == "yes"){
        if(innode.yes != null){
         nextpointer = innode.yes;
        }
       }
       else{
        if(innode.no != null){
        nextpointer = innode.no;
        }
       }
       if(nextpointer.yes == null && nextpointer.no == null){
         setinnode(nextpointer);
         setgamestatus(END);
       }
       else{
         setinnode(nextpointer);
       }
    }

    return(
        <div className = "game">
            {   gamestatus==GAMING &&
                <div className = "gaming">
             <img className = "danny" src = "../UI/drachenispy.png" height = "250px" width = "200px"/>
             <div className = "bubble">
             <img  src = "../UI/conver.png" height = "500px" width = "1000px" />
             <div className = "content">
                  <p className = "question">{innode.question}</p>
                  <div className = "button-area">
                  <Stack spacing = {10} direction = "row">
                    <ButtonSmall onClick = {() => next("yes")} >
                        Yes
                    </ButtonSmall>
                    <ButtonSmall onClick = {() => next("no") } sx={{backgroundColor: "rgba(244, 81, 109, 0.51)"}}>
                        No
                    </ButtonSmall>
                    </Stack>
                  </div>
             </div>
             </div>
             </div>
            }
            {
                gamestatus == END &&
                <div className = "result">
                    <img className = "dannyend" src = "../UI/drachenhappy.png" height = "250px" width = "200px"/>
                    <div className = "bubbleend">
                        <img src = "../UI/resbubble.png" height = "400px" width = "400px" />
                        <div className = "answerbox">
                              <p className = "answer">Your fruit is: {innode.question} </p>
                        </div>      
                    </div>
                    <img className = "resultimage" src = {"../images/"+selectedimage.path} height = "400px" width = "450px" />   
                </div>
            }
        </div>
    )
};

export default Game;