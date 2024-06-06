// external lib
import Countdown from "react-countdown";

/**
 * Props
 * -----------------------------------
 */
type Props = {
  date: string;
  onEnded?: () => void;
};

export default function QACountdown({ date, onEnded }: Props) {
  // -- Functions --
  const rendererCountdown = ({ hours, minutes, seconds, completed }: any) => {
    if (completed) {
      onEnded ? onEnded() : "";
      return "__ : __ : __";
    } else {
      const formattedHours = hours.toString().padStart(2, "0");
      const formattedMinutes = minutes.toString().padStart(2, "0");
      const formattedSeconds = seconds.toString().padStart(2, "0");

      return (
        <span>
          {formattedHours} : {formattedMinutes} : {formattedSeconds}
        </span>
      );
    }
  };

  return (
    <Countdown date={new Date(date).getTime()} renderer={rendererCountdown} />
  );
}
