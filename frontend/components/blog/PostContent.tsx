import { FC } from "react";
import styles from "./PostContent.module.css";

const PostContent: FC = ({ children }) => (
  <div
    className={`${styles.post} w-full text-justify md:px-12`}
    dangerouslySetInnerHTML={{ __html: children as string }}
  />
);

export default PostContent;
