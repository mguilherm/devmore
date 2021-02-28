import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { ChallengesContext } from "./ChallengesContext";

interface CountdownContextData {
  minutes: number;
  seconds: number;
  hasFinished: boolean;
  isActive: boolean;
  startCountdown: () => void;
  resetCountdown: () => void;
}

interface CountdownProviderProps {
  children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData);

let countdownTimeOut: NodeJS.Timeout;

export function CountdownProvider({ children }: CountdownProviderProps) {
  const { startNewChallenge } = useContext(ChallengesContext);
  const [time, setTime] = useState(25 * 60);
  const [isActive, setisActive] = useState(false);
  const [hasFinished, setHasFinised] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  //regra do useEffect => executa uma função '() => {}' , sempre que algo '[]' mudar
  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeOut = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      setHasFinised(true);
      setisActive(false);
      startNewChallenge();
    }
  }, [isActive, time]);

  function startCountdown() {
    setisActive(true);
  }

  function resetCountdown() {
    clearTimeout(countdownTimeOut);
    setisActive(false);
    setTime(25 * 60);
    setHasFinised(false);
  }

  return (
    <CountdownContext.Provider
      value={{
        minutes,
        seconds,
        hasFinished,
        isActive,
        startCountdown,
        resetCountdown,
      }}
    >
      {children}
    </CountdownContext.Provider>
  );
}

/*  ============= estrutura basica de context.

  import { createContext, ReactNode } from "react";

interface CountdownContextData {}

interface CountdownProviderProps {
    children: ReactNode;
  }
const CountdownContext = createContext({} as CountdownContextData);

export function CountdownProvider({ children }: CountdownProviderProps) {
  
    return (
        <CountdownContext.Provider value={{}}>
            {children}
        </CountdownContext.Provider>)
  }


  */
