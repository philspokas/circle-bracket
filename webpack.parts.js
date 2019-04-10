exports.devServer = ({ host, port } = {}) => ({
  devServer: {
    stats: "errors-only",
    overlay: true,
    host,
    port
  }
});

exports.loadJS = () => ({
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: "/(node_modules|bower_components)/",
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  }
});

exports.loadImages = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        include,
        exclude,
        use: {
          loader: "url-loader",
          options
        }
      }
    ]
  }
});

exports.loadSVG = (options = { minify: false }) => {
  return {
    module: {
      rules: [
        {
          test: /\.svg$/,
          use: [
            {
              loader: "file-loader",
              options: {
                outputPath: "svg"
              }
            },
            {
              loader: "image-webpack-loader",
              options: {
                disable: !options.minify,
                svgo: {}
              }
            }
          ]
        }
      ]
    }
  };
};

exports.loadCSS = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        include,
        exclude,

        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "fast-sass-loader",
            options: {}
          }
        ]
      }
    ]
  }
});
