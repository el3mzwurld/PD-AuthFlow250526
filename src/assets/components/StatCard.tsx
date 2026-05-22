import { motion } from "motion/react";
import { IconType } from "react-icons";
// Card props
interface CardProps {
  title: string;
  icon: IconType;
  stat: string;
  caption: string;
  positive?: boolean;
  negative?: boolean;
}

const StatCard = (props: CardProps) => {
  return <></>;
};

export default StatCard;
