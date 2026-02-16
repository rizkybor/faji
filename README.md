# FAJI - Federasi Arung Jeram Indonesia

Official Website of Federasi Arung Jeram Indonesia (FAJI). This project is a modern, responsive, and performant web application built to showcase FAJI's activities, programs, and membership distribution across Indonesia.

## 🚀 Tech Stack

-   **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **Animation:** [Framer Motion](https://www.framer.com/motion/)
-   **Internationalization:** [next-intl](https://next-intl-docs.vercel.app/) (ID/EN)
-   **Maps:** [react-simple-maps](https://www.react-simple-maps.io/) with TopoJSON
-   **Icons:** [Lucide React](https://lucide.dev/)

## ✨ Key Features

-   **Bilingual Support:** Full content localization in Indonesian (ID) and English (EN).
-   **Interactive Indonesia Map:** Visualizes FAJI's membership distribution across provinces with interactive tooltips and highlighting.
-   **Dynamic Program Pages:** Dedicated detail pages for each FAJI program (Competition, Training, Conservation, etc.).
-   **Responsive Design:** Optimized for all device sizes, from mobile phones to large desktop screens.
-   **SEO Optimized:** Comprehensive metadata, Open Graph tags, sitemap, and robots.txt configuration.
-   **Modern UI/UX:** Smooth animations, parallax effects, and a clean, professional aesthetic.

## 🛠️ Getting Started

1.  **Clone the repository**

    ```bash
    git clone https://github.com/your-username/faji-web.git
    cd faji-web
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Run the development server**

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

4.  **Build for production**

    ```bash
    npm run build
    npm start
    ```

## 📂 Project Structure

```
├── messages/           # Localization files (en.json, id.json)
├── public/             # Static assets (images, data)
├── src/
│   ├── app/            # Next.js App Router pages
│   ├── components/     # Reusable UI components
│   ├── data/           # Static data constants
│   ├── navigation.ts   # Navigation configuration
│   ├── middleware.ts   # Next.js middleware (i18n)
│   └── ...
└── ...
```

## 📝 License

This project is licensed under the [MIT License](LICENSE).
