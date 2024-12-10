import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";

export default async () => {
  const fetchCharacters = async (limit) => {
    let characters = [];
    let url = "https://rickandmortyapi.com/api/character";
    
    while (url && characters.length < limit) {
      let response = await fetch(url);
      let json = await response.json();
      characters = characters.concat(json.results);
      url = json.info.next;
    }
    
    return characters.slice(0, limit);
  };

  const characters = await fetchCharacters(43);

  let pages = characters.map((character) => {
    return new HtmlWebpackPlugin({
      template: './src/character.njk',
      filename: `character_${character.id}.html`,
      templateParameters: {
        character,
      },
    });
  });

  return {
    entry: "./src/index.js",
    output: {
      filename: "main.js",
      path: path.resolve(import.meta.dirname, "dist"),
    },
    devServer: {
      static: {
        directory: path.join(import.meta.dirname, "public"),
      },
      compress: true,
      port: 9000,
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.scss$/i,
          use: [
            "style-loader",
            "css-loader",
            {
              loader: "sass-loader",
              options: {
                sassOptions: {
                  quietDeps: true,
                },
              },
            },
          ],
        },
        {
          test: /\.njk$/i,
          use: [
            {
              loader: "simple-nunjucks-loader",
              options: {},
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.njk",
        templateParameters: {
          name: "Sten",
          characters,
        },
      }),
      new HtmlWebpackPlugin({
        filename: "about.html",
        template: "./src/about.njk",
      }),
      ...pages,
    ],
  };
};
