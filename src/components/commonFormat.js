import { message } from "antd";
import "./homepage.css";

export function showMessage(content, type) {
  switch (type) {
    case "success":
      return message.success({ content: content, className: "message" });
    case "info":
      return message.info({ content: content, className: "message" });
    case "error":
      return message.error({ content: content, className: "message" });
    case "warning":
      return message.warning({ content: content, className: "message" });
    default:
      return 
  }
}

export function formatNumber(value){
   return (String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ","))
};

export function formatTitle(titlePara, setTitleSub){
  const title = String(titlePara);
  if(title.length > 50){
    setTitleSub(title.slice(0,50)+"...");
  }
  else{
    setTitleSub(title);
  }
}