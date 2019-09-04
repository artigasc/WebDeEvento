class ThematicSessionModel {
  title: string;
  description: string;
  objSessionInfo: {
    title: string;
    subtitle: string;
    description: string;
    urlpicture: string;
  };
  Sessions: SessionsData[];
}
class SessionsData {
  Name: string;
  Detail: string;
  Position: string;
}


export default ThematicSessionModel;
