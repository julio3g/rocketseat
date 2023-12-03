import { Post } from "./components/Post";
import { Header } from "./components/Header";
import { Sidebar } from "./components/SideBar";

import "./global.css";
import styles from "./app.module.css";

const posts = [
  {
    id: 1,
    author: {
      authorUrl: "https://github.com/julio3g.png",
      name: "Julio Cesar Orso",
      role: "Web Developer",
    },
    content: [
      { type: "paragraph", content: "Fala galeraa 👋" },
      {
        type: "paragraph",
        content:
          "Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀",
      },
      { type: "link", content: "jane.design/doctorcare" },
    ],
    publishedAt: new Date("2022-06-03 20:00:00"),
  },
  {
    id: 2,
    author: {
      authorUrl: "https://github.com/diego3g.png",
      name: "Diego Fernandes",
      role: "Web Developer",
    },
    content: [
      { type: "paragraph", content: "Fala galeraa 👋" },
      {
        type: "paragraph",
        content:
          "Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀",
      },
      { type: "link", content: "jane.design/doctorcare" },
    ],
    publishedAt: new Date("2022-06-04 00:00:00"),
  },
];

export function App(): JSX.Element {
  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map((post) => {
            return (
              <Post
                key={post.id}
                author={post.author}
                content={post.content}
                publishedAt={post.publishedAt}
              />
            );
          })}
        </main>
      </div>
    </>
  );
}
