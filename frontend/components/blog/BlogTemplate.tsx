import { FC } from "react";

import Header from "../landing/Header";
import Footer from "../landing/Footer";

const BlogTemplate: FC = ({ children }) => (
  <div className="flex flex-col justify-between min-h-screen">
    <Header title="Lina – Blog" />
    <div className="flex-grow">{children}</div>
    <Footer />
  </div>
);

export default BlogTemplate;
