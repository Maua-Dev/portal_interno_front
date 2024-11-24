<p align="center">
    <img src="https://d22wxe17x1tv7t.cloudfront.net/portalinterno.png" align="center" width="30%">
</p>
<p align="center"><h1 align="center">PORTAL INTERNO</h1></p>
<p align="center">
	<em>Empower Your Team with Portal Interno: Open Source Innovation at Your Fingertips!</em>
</p>
<p align="center">
	<img src="https://img.shields.io/github/license/Maua-Dev/portal_interno_front?style=default&logo=opensourceinitiative&logoColor=white&color=0080ff" alt="license">
	<img src="https://img.shields.io/github/last-commit/Maua-Dev/portal_interno_front?style=default&logo=git&logoColor=white&color=0080ff" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/Maua-Dev/portal_interno_front?style=default&color=0080ff" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/Maua-Dev/portal_interno_front?style=default&color=0080ff" alt="repo-language-count">
</p>
<p align="center"><!-- default option, no dependency badges. -->
</p>
<p align="center">
	<!-- default option, no dependency badges. -->
</p>
<br>

##  Table of Contents

- [ Overview](#-overview)
- [ Features](#-features)
- [ Project Structure](#-project-structure)
  - [ Project Index](#-project-index)
- [ Getting Started](#-getting-started)
  - [ Prerequisites](#-prerequisites)
  - [ Installation](#-installation)
  - [ Usage](#-usage)
  - [ Testing](#-testing)
- [ Contributing](#-contributing)
- [ License](#-license)
- [ Acknowledgments](#-acknowledgments)

---

##  Overview

**Overview**: portalinternofront

**Problem**: Simplifying TypeScript compilation and build setup for efficient development.

**Features**: Optimized tsconfig setup for Vite, tailored package.json dependencies, PostCSS configuration for styling consistency.

**Benefits**: Faster development cycles, strict type checking, consistent styling, and stable dependency management.

**Audience**: Developers working on Vite-based projects requiring TypeScript, React, and PostCSS integration.

---

##  Features

|      | Feature         | Summary       |
| :--- | :---:           | :---          |
| ⚙️  | **Architecture**  | <ul><li>Based on TypeScript</li><li>Utilizes React for frontend</li><li>Follows a component-based architecture</li></ul> |
| 🔩 | **Code Quality**  | <ul><li>Uses ESLint for code linting</li><li>Includes Prettier for code formatting</li><li>Enforces TypeScript type checking</li></ul> |
| 📄 | **Documentation** | <ul><li>Extensive documentation in TypeScript and JSON</li><li>Includes setup instructions for npm and yarn</li><li>Provides usage and test commands</li></ul> |
| 🔌 | **Integrations**  | <ul><li>Integrates with GitHub Actions for CI/CD</li><li>Includes various third-party libraries like Axios and React Router</li><li>Uses Vite for fast development</li></ul> |
| 🧩 | **Modularity**    | <ul><li>Utilizes modular components for easy maintenance</li><li>Follows best practices for separation of concerns</li><li>Encourages reusability of components</li></ul> |
| 🧪 | **Testing**       | <ul><li>Includes testing with Vitest</li><li>Uses Jest for unit testing</li><li>Implements testing best practices</li></ul> |
| ⚡️  | **Performance**   | <ul><li>Optimizes performance with React hooks and lazy loading</li><li>Utilizes Tailwind CSS for efficient styling</li><li>Follows best practices for performance optimization</li></ul> |
| 🛡️ | **Security**      | <ul><li>Implements security best practices for data handling</li><li>Uses secure libraries like Axios for API calls</li><li>Follows guidelines for preventing common security vulnerabilities</li></ul> |
| 📦 | **Dependencies**  | <ul><li>Includes a wide range of dependencies for various functionalities</li><li>Manages dependencies using npm and yarn</li><li>Keeps dependencies up to date</li></ul> |

---

##  Project Structure

```sh
└── portal_interno_front/
    ├── .github
    │   └── workflows
    ├── README.md
    ├── __tests__
    │   └── @clean
    ├── favicon.ico
    ├── iac
    │   ├── .gitignore
    │   ├── .npmignore
    │   ├── README.md
    │   ├── bin
    │   ├── cdk.json
    │   ├── lib
    │   ├── package-lock.json
    │   ├── package.json
    │   └── tsconfig.json
    ├── index.html
    ├── lambda_triggers
    │   └── edge_function.ts
    ├── package.json
    ├── pnpm-lock.yaml
    ├── postcss.config.js
    ├── src
    │   ├── @clean
    │   ├── app
    │   └── vite-env.d.ts
    ├── tailwind.config.js
    ├── tsconfig.json
    ├── tsconfig.node.json
    ├── vite.config.ts
    └── yarn.lock
```


###  Project Index
<details open>
	<summary><b><code>PORTAL_INTERNO_FRONT/</code></b></summary>
	<details> <!-- __root__ Submodule -->
		<summary><b>__root__</b></summary>
		<blockquote>
			<table>
			<tr>
				<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/tsconfig.node.json'>tsconfig.node.json</a></b></td>
				<td>- Optimizes TypeScript compilation for the project by enabling composite mode, bundler module resolution, and synthetic default imports<br>- It includes specific type roots and excludes unused locals and parameters checks<br>- The configuration is tailored for the Vite build setup.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/package.json'>package.json</a></b></td>
				<td>- Define project dependencies and scripts for development, building, linting, and testing<br>- Include libraries for form handling, UI components, HTTP requests, and state management<br>- Utilize tools like Vite, TypeScript, ESLint, and Prettier for efficient development.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/tsconfig.json'>tsconfig.json</a></b></td>
				<td>- Configures TypeScript compiler options for the project, targeting ES2020 with bundler mode and React JSX support<br>- Enforces strict type checking and linting rules, while allowing importing TypeScript extensions<br>- Includes necessary libraries and modules for Node.js and Vite client<br>- References additional configuration in tsconfig.node.json for modularization.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/postcss.config.js'>postcss.config.js</a></b></td>
				<td>Configures PostCSS plugins Tailwind CSS and Autoprefixer for the project's build process, ensuring consistent styling and browser compatibility across the codebase architecture.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/pnpm-lock.yaml'>pnpm-lock.yaml</a></b></td>
				<td>- The `pnpm-lock.yaml` file in the project structure serves as a lockfile to manage dependencies and ensure consistent package versions across the codebase<br>- It specifies the versions of packages required for the project, including dependencies like '@hookform/resolvers' and '@radix-ui/react-avatar'<br>- This file plays a crucial role in maintaining a stable and reproducible development environment by pinning down specific package versions.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/vite.config.ts'>vite.config.ts</a></b></td>
				<td>Configures Vite to use React plugin and sets the server port to 5000.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/index.html'>index.html</a></b></td>
				<td>- Defines the main webpage structure and content for the Dev<br>- Community Mauá internal portal<br>- Includes metadata for social sharing and references the main TypeScript file for the application logic<br>- The file serves as the entry point for rendering the portal interface and initializing the application functionality.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/tailwind.config.js'>tailwind.config.js</a></b></td>
				<td>- Configures Tailwind CSS theme, colors, and plugins for the project's design system<br>- Defines custom colors, text, background styles, and animations<br>- Specifies content paths for Tailwind to process, enhancing the project's visual consistency and user experience.</td>
			</tr>
			</table>
		</blockquote>
	</details>
	<details> <!-- __tests__ Submodule -->
		<summary><b>__tests__</b></summary>
		<blockquote>
			<details>
				<summary><b>@clean</b></summary>
				<blockquote>
					<details>
						<summary><b>modules</b></summary>
						<blockquote>
							<details>
								<summary><b>action</b></summary>
								<blockquote>
									<details>
										<summary><b>usecases</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/__tests__/@clean/modules/action/usecases/test_get_member_usecase.test.ts'>test_get_member_usecase.test.ts</a></b></td>
												<td>- Tests the Get Member Usecase functionality by creating a mock repository and executing the usecase to retrieve member data<br>- Validates the returned member object's properties against expected values.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/__tests__/@clean/modules/action/usecases/test_update_action_usecase.test.ts'>test_update_action_usecase.test.ts</a></b></td>
												<td>- The code file provides tests for updating various attributes of an Action entity using the Update Action Usecase<br>- These tests cover scenarios such as updating start/end dates, duration, title, description, project code, associated members, stack tags, and action type tags<br>- The tests ensure that the Update Action Usecase functions correctly in modifying different aspects of an Action entity.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/__tests__/@clean/modules/action/usecases/test_get_history_usecase.test.ts'>test_get_history_usecase.test.ts</a></b></td>
												<td>- The test file validates the functionality of the Get History Usecase in the project's action module<br>- It ensures that the use case retrieves historical actions correctly, including filtering by start and end timestamps<br>- The tests confirm the expected behavior of fetching and processing action data within the application.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/__tests__/@clean/modules/action/usecases/test_create_associated_action_usecase.test.ts'>test_create_associated_action_usecase.test.ts</a></b></td>
												<td>- Implements tests for creating associated actions, ensuring valid and invalid scenarios are handled appropriately<br>- The tests validate the creation of associated actions and error handling for invalid member data.</td>
											</tr>
											</table>
										</blockquote>
									</details>
								</blockquote>
							</details>
						</blockquote>
					</details>
					<details>
						<summary><b>shared</b></summary>
						<blockquote>
							<details>
								<summary><b>domain</b></summary>
								<blockquote>
									<details>
										<summary><b>functions</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/__tests__/@clean/shared/domain/functions/test_raformatter.test.ts'>test_raformatter.test.ts</a></b></td>
												<td>- Converts plain text into a formatted RA number for the project's domain functions<br>- The test ensures the correct transformation of a given plain text input into the expected RA format.</td>
											</tr>
											</table>
										</blockquote>
									</details>
								</blockquote>
							</details>
						</blockquote>
					</details>
				</blockquote>
			</details>
		</blockquote>
	</details>
	<details> <!-- lambda_triggers Submodule -->
		<summary><b>lambda_triggers</b></summary>
		<blockquote>
			<table>
			<tr>
				<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/lambda_triggers/edge_function.ts'>edge_function.ts</a></b></td>
				<td>- Implements a Lambda function that appends '.html' to URIs lacking extensions or trailing slashes<br>- The function is triggered by CloudFront events and modifies the request URI accordingly.</td>
			</tr>
			</table>
		</blockquote>
	</details>
	<details> <!-- iac Submodule -->
		<summary><b>iac</b></summary>
		<blockquote>
			<table>
			<tr>
				<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/iac/package.json'>package.json</a></b></td>
				<td>- Define the project's dependencies, scripts, and binary configuration in the package.json file<br>- This file manages the project's build, testing, and AWS CDK commands, along with specifying required dependencies for development and runtime.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/iac/tsconfig.json'>tsconfig.json</a></b></td>
				<td>- Define TypeScript compiler options in tsconfig.json to enforce strict type checking and ES2020 compatibility, ensuring robust code quality and adherence to best practices<br>- This configuration file plays a crucial role in maintaining a standardized development environment across the project, promoting consistency and reliability in the codebase architecture.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/iac/cdk.json'>cdk.json</a></b></td>
				<td>- Defines project configuration settings for AWS CDK, specifying app entry point, file watch settings, and various context options for AWS services<br>- Controls CDK behavior for Lambda, ECS, IAM, S3, Route53, and more, ensuring consistent and secure deployment across AWS regions.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/iac/package-lock.json'>package-lock.json</a></b></td>
				<td>- The `package-lock.json` file in the `iac` directory of the project serves as a lockfile for managing dependencies<br>- It ensures that the project uses specific versions of dependencies like `aws-cdk-lib`, `constructs`, `dotenv`, and `source-map-support`<br>- This file plays a crucial role in maintaining consistency and reproducibility in the project's dependency management.</td>
			</tr>
			</table>
			<details>
				<summary><b>lib</b></summary>
				<blockquote>
					<table>
					<tr>
						<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/iac/lib/iac-stack.ts'>iac-stack.ts</a></b></td>
						<td>- Implements a CDK stack for deploying a secure AWS CloudFront distribution with S3 origin, ACM certificates, and Route 53 DNS records<br>- Manages multiple environments with different configurations based on the deployment stage<br>- Enables secure content delivery and DNS routing for the specified domains.</td>
					</tr>
					</table>
				</blockquote>
			</details>
			<details>
				<summary><b>bin</b></summary>
				<blockquote>
					<table>
					<tr>
						<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/iac/bin/iac.ts'>iac.ts</a></b></td>
						<td>Defines and deploys an AWS Cloud Development Kit (CDK) stack for the internal portal, using environment variables for account and region configuration.</td>
					</tr>
					</table>
				</blockquote>
			</details>
		</blockquote>
	</details>
	<details> <!-- src Submodule -->
		<summary><b>src</b></summary>
		<blockquote>
			<table>
			<tr>
				<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/vite-env.d.ts'>vite-env.d.ts</a></b></td>
				<td>- Defines environment variables for the project, including VITE_STAGE, VITE_MSS_API_URL, and VITE_REFRESH_TOKEN_URL<br>- This information is crucial for configuring the application based on different environments and API endpoints.</td>
			</tr>
			</table>
			<details>
				<summary><b>app</b></summary>
				<blockquote>
					<table>
					<tr>
						<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/app/AppRouter.tsx'>AppRouter.tsx</a></b></td>
						<td>- Defines routing for the React application using react-router-dom, rendering different components based on the URL path<br>- The AppRouter component maps specific routes to corresponding page components like Home and Login, ensuring proper navigation within the application<br>- Additionally, it handles any undefined routes by displaying a 404 page.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/app/globals.css'>globals.css</a></b></td>
						<td>- Define global color variables and themes for the project's design system in the CSS file<br>- Set base colors and theme variations to maintain consistency across the application's visual elements.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/app/main.tsx'>main.tsx</a></b></td>
						<td>- Initiates the rendering of the main application component by setting up the necessary context providers and routing configuration<br>- This file serves as the entry point for the React application, orchestrating the hierarchy of context providers and components to establish the core structure of the user interface.</td>
					</tr>
					</table>
					<details>
						<summary><b>pages</b></summary>
						<blockquote>
							<table>
							<tr>
								<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/app/pages/Home.tsx'>Home.tsx</a></b></td>
								<td>- Manages the Home page UI components, including notifications, modals, and dark mode settings<br>- Handles member actions and displays relevant toasts<br>- Integrates with various custom hooks for state management and user interactions<br>- Overall, orchestrates a seamless user experience within the application.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/app/pages/Login.tsx'>Login.tsx</a></b></td>
								<td>- Implements a login page that handles token storage and redirects based on environment<br>- Manages dark mode, token retrieval, and redirects users to the appropriate authentication URL<br>- Displays branding elements and prompts users to authenticate for access to the internal portal.</td>
							</tr>
							</table>
						</blockquote>
					</details>
					<details>
						<summary><b>contexts</b></summary>
						<blockquote>
							<table>
							<tr>
								<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/app/contexts/modal_context.tsx'>modal_context.tsx</a></b></td>
								<td>- Manages modal state and content rendering within the application, facilitating dynamic display of different components based on user interactions<br>- The ModalContext file defines the structure and behavior of the modal context, enabling seamless control over modal visibility and content changes throughout the project.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/app/contexts/action_context.tsx'>action_context.tsx</a></b></td>
								<td>- Defines and provides essential functions for managing actions within the project, including creating, updating, deleting, and retrieving action history<br>- The code establishes a context interface and a provider for handling these actions seamlessly across the codebase architecture.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/app/contexts/project_context.tsx'>project_context.tsx</a></b></td>
								<td>- Facilitates project management operations by providing functions to retrieve, create, update, and delete projects<br>- Utilizes context and use cases to interact with project data, ensuring seamless integration within the codebase architecture.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/app/contexts/theme_context.tsx'>theme_context.tsx</a></b></td>
								<td>- Manages theme settings and dark mode toggle functionality for the project<br>- Utilizes local storage to persist dark mode preference<br>- Redirects to a specific URL after a certain number of dark mode toggles in production<br>- Integrates with React context API to provide theme state and toggle function to child components.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/app/contexts/member_context.tsx'>member_context.tsx</a></b></td>
								<td>- Defines a context for managing member data, including functions for retrieving, creating, updating, and deleting members<br>- Handles member authentication, permissions, and profile picture changes<br>- Facilitates member-related operations within the application.</td>
							</tr>
							</table>
						</blockquote>
					</details>
					<details>
						<summary><b>components</b></summary>
						<blockquote>
							<table>
							<tr>
								<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/app/components/TextSkeleton.tsx'>TextSkeleton.tsx</a></b></td>
								<td>- Defines a reusable TextSkeleton component that renders a visually appealing placeholder for text content<br>- It leverages Tailwind CSS utilities to style the component, enhancing the user experience by providing a smooth loading animation<br>- This component contributes to the project's architecture by promoting code reusability and maintaining a consistent design language across the application.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/app/components/OnHoldModal.tsx'>OnHoldModal.tsx</a></b></td>
								<td>- Defines the OnHoldModal component responsible for displaying a modal when a user is on hold<br>- It leverages dark mode and member hooks to customize the modal appearance and handle logout functionality<br>- The component ensures a user-friendly experience by providing necessary information and a clear exit option.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/app/components/NoDataFoundCard.tsx'>NoDataFoundCard.tsx</a></b></td>
								<td>- Define and render a component for displaying a message when no actions are found<br>- The component utilizes the Lucide-React SearchX icon and a Card component to present the message in a visually appealing manner<br>- It ensures a consistent layout by leveraging Tailwind CSS utility classes for styling.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/app/components/Badge.tsx'>Badge.tsx</a></b></td>
								<td>- Implements a Badge component that dynamically adjusts its appearance based on the dark mode setting from the ThemeContext<br>- The component renders a styled badge with text content, enhancing the user interface of the application.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/app/components/Separator.tsx'>Separator.tsx</a></b></td>
								<td>Defines a reusable component for rendering a separator with a horizontal line to visually separate content within the project's user interface.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/app/components/ProfileModal.tsx'>ProfileModal.tsx</a></b></td>
								<td>- Generates a profile modal displaying user information and work stats<br>- Utilizes React hooks to manage dark mode and member data<br>- Renders user details, dev info, and a personal summary<br>- Includes a clock widget showing total hours worked<br>- Designed for a seamless user experience with smooth transitions.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/app/components/RadioItem.tsx'>RadioItem.tsx</a></b></td>
								<td>- Defines a RadioItem component that renders a selectable item within a radio group<br>- It handles styling based on user selection and dark mode settings<br>- The component also supports displaying a count number<br>- This component enhances user interaction and visual feedback within the application's radio group functionality.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/app/components/Card.tsx'>Card.tsx</a></b></td>
								<td>- Defines a reusable Card component with different size variants for displaying content in the UI<br>- The component leverages Tailwind CSS utility classes to style the card based on the specified variant<br>- This abstraction simplifies the creation of consistent and visually appealing card elements across the application.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/app/components/Tags.tsx'>Tags.tsx</a></b></td>
								<td>- Implements components for tagging, filtering, and displaying member statuses based on predefined variants and styles<br>- Enhances user interface by dynamically rendering tags with icons and labels, allowing for interactive filtering and visual representation of member statuses<br>- Supports dark mode and smooth animations for a seamless user experience within the project architecture.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/app/components/Navbar.tsx'>Navbar.tsx</a></b></td>
								<td>- Implements a responsive Navbar component that dynamically adjusts based on window size<br>- It handles user interactions, such as toggling dark mode, managing user profile, tasks, history, projects, and members<br>- The component also includes a notification feature and logout functionality for administrators.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/app/components/Tooltip.tsx'>Tooltip.tsx</a></b></td>
								<td>- Implements a Tooltip component that displays content on hover<br>- It leverages Radix UI for tooltip functionality and Tailwind CSS for styling<br>- The component accepts a placeholder text and renders it within a styled tooltip container<br>- This Tooltip component enhances user experience by providing contextual information in a visually appealing manner.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/app/components/ActionDialog.tsx'>ActionDialog.tsx</a></b></td>
								<td>- Generates a dialog interface displaying details of a specific action, including associated members, project information, and a timeline<br>- Utilizes React components and context to manage state and display dynamic content<br>- Enhances user experience by providing a structured view of action-related data.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/app/components/Loader.tsx'>Loader.tsx</a></b></td>
								<td>- Defines reusable components for displaying loading states in the application, utilizing a provided SkeletonComponent<br>- The List component renders a list of SkeletonComponents with varying opacities, while the Notification component displays a simpler loading state<br>- These components enhance user experience by visually indicating ongoing data loading processes.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/app/components/HoverCard.tsx'>HoverCard.tsx</a></b></td>
								<td>Enables interactive hover cards with customizable content and placement within the project's component architecture.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/app/components/RegisterModal.tsx'>RegisterModal.tsx</a></b></td>
								<td>- Facilitates user registration by validating and submitting member details<br>- Utilizes React hooks and form validation to handle user input<br>- Displays error messages for invalid data entries<br>- Upon successful submission, triggers a success notification and reloads the page<br>- Integrates with context for member creation.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/app/components/Avatar.tsx'>Avatar.tsx</a></b></td>
								<td>- Defines and renders avatars for project members, allowing profile picture editing<br>- Handles image compression, file selection, and profile picture updates<br>- Dynamically adjusts avatar appearance based on member data and user interactions<br>- Supports dark mode and displays placeholder if member data is missing.</td>
							</tr>
							</table>
							<details>
								<summary><b>NotificationDrawer</b></summary>
								<blockquote>
									<table>
									<tr>
										<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/app/components/NotificationDrawer/index.tsx'>index.tsx</a></b></td>
										<td>- Implements a Notification Drawer component that displays notifications for members based on their active status<br>- It includes loading logic, notification count, and dynamic content rendering<br>- The component allows users to filter notifications and provides a visually appealing display of member notifications.</td>
									</tr>
									</table>
									<details>
										<summary><b>components</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/app/components/NotificationDrawer/components/NoNotifications.tsx'>NoNotifications.tsx</a></b></td>
												<td>Displays a notification drawer component with a message indicating no new notifications.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/app/components/NotificationDrawer/components/NoticationMemberCard.tsx'>NoticationMemberCard.tsx</a></b></td>
												<td>- Implement a notification card component for managing member access requests<br>- Display member details, hiring duration, and options to approve or delete the request<br>- Utilizes context for member data and dark mode settings<br>- Handles asynchronous member updates and deletions with visual feedback using buttons and animations<br>- Integrates toast notifications for successful actions.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/app/components/NotificationDrawer/components/NotificationIcon.tsx'>NotificationIcon.tsx</a></b></td>
												<td>- Implements a notification icon component that dynamically displays the count of notifications for members on hold<br>- The component utilizes animations to update the count visually<br>- It integrates with the MemberContext and dark mode settings, providing a user-friendly notification feature within the application.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/app/components/NotificationDrawer/components/NotificationMemberCardSkeleton.tsx'>NotificationMemberCardSkeleton.tsx</a></b></td>
												<td>Generates a skeleton layout for notification member cards, displaying loading animations for various text and image placeholders.</td>
											</tr>
											</table>
										</blockquote>
									</details>
								</blockquote>
							</details>
							<details>
								<summary><b>FilterBar</b></summary>
								<blockquote>
									<table>
									<tr>
										<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/app/components/FilterBar/index.tsx'>index.tsx</a></b></td>
										<td>- The code file in src/app/components/FilterBar/index.tsx orchestrates a dynamic filtering interface within the project's architecture<br>- It enables users to apply and clear filters, search for specific items, and interact with various filter options<br>- The FilterBar component seamlessly integrates with other components to enhance the overall user experience and streamline data manipulation.</td>
									</tr>
									</table>
									<details>
										<summary><b>components</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/app/components/FilterBar/components/Select.tsx'>Select.tsx</a></b></td>
												<td>- Defines reusable components for a filter bar in the project, including a select dropdown with customizable label and options<br>- The components handle styling and behavior for different variants, enhancing user experience and maintainability of the codebase architecture.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/app/components/FilterBar/components/SearchField.tsx'>SearchField.tsx</a></b></td>
												<td>- Implements a search field component for the FilterBar, enhancing user interaction by providing a visually appealing and functional input field with search icon<br>- The component integrates Tailwind CSS for styling and Lucide icons for visual elements, contributing to a cohesive user interface within the project architecture.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/app/components/FilterBar/components/Text.tsx'>Text.tsx</a></b></td>
												<td>- Defines a customizable Text component for the FilterBar section, allowing for different text sizes and styles based on specified variants<br>- The component dynamically applies Tailwind CSS classes to style the text accordingly<br>- This enhances the visual presentation and user experience within the FilterBar component of the project.</td>
											</tr>
											</table>
										</blockquote>
									</details>
								</blockquote>
							</details>
							<details>
								<summary><b>Projects</b></summary>
								<blockquote>
									<table>
									<tr>
										<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/app/components/Projects/index.tsx'>index.tsx</a></b></td>
										<td>- The Projects component manages project data display and interaction within the application<br>- It fetches and filters projects based on user input, allowing for project creation, editing, and viewing<br>- The component integrates with various subcomponents to provide a seamless user experience while handling project-related functionalities.</td>
									</tr>
									<tr>
										<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/app/components/Projects/filterOptions.tsx'>filterOptions.tsx</a></b></td>
										<td>- Defines project filter options for the FilterBar component, including search text and sorting criteria<br>- Allows users to search projects and sort them by either most recent or oldest<br>- Additional options like active status and duration sorting are commented out for potential future use.</td>
									</tr>
									</table>
									<details>
										<summary><b>components</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/app/components/Projects/components/ProjectDialog.tsx'>ProjectDialog.tsx</a></b></td>
												<td>- The ProjectDialog component manages project creation and updates, ensuring data integrity and user input validation<br>- It integrates with various context providers and utility functions to handle project details, member selection, and image uploads<br>- This component plays a crucial role in enhancing the user experience by facilitating seamless project management within the application architecture.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/app/components/Projects/components/MemberSelector.tsx'>MemberSelector.tsx</a></b></td>
												<td>- Implements a member selector component that allows users to search and select members from a list<br>- The component dynamically filters and displays matching members based on user input<br>- It provides a user-friendly interface for selecting members within the project's architecture.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/app/components/Projects/components/ProjectCardSkeleton.tsx'>ProjectCardSkeleton.tsx</a></b></td>
												<td>- Generates a skeleton layout for project cards, displaying placeholder content for loading states<br>- The component structures a card with various text and icon placeholders, enhancing the user experience during data loading.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/app/components/Projects/components/ProjectCard.tsx'>ProjectCard.tsx</a></b></td>
												<td>- Displays a project card with key details and options for editing or deleting<br>- Renders project name, description, team members, and start date<br>- Allows editing project details and deleting the project with confirmation<br>- Utilizes icons, buttons, and popovers for a user-friendly interface.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/app/components/Projects/components/ProjectInfoCard.tsx'>ProjectInfoCard.tsx</a></b></td>
												<td>- Generates a project info card displaying project details and associated members<br>- Handles editing project info and loading member data dynamically<br>- Utilizes a dialog component for a user-friendly interface.</td>
											</tr>
											</table>
										</blockquote>
									</details>
								</blockquote>
							</details>
							<details>
								<summary><b>Historic</b></summary>
								<blockquote>
									<table>
									<tr>
										<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/app/components/Historic/index.tsx'>index.tsx</a></b></td>
										<td>- Generates a historical view of actions with filtering and sorting capabilities<br>- Displays action cards with details and allows users to load more actions<br>- Implements a filter bar for search and categorization<br>- Handles empty states and loading indicators for a seamless user experience.</td>
									</tr>
									<tr>
										<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/app/components/Historic/filterOptions.ts'>filterOptions.ts</a></b></td>
										<td>Define filter options for search, projects, area, and sorting in the FilterBar component to enhance user experience and data organization.</td>
									</tr>
									</table>
									<details>
										<summary><b>components</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/app/components/Historic/components/HistoricActionCard.tsx'>HistoricActionCard.tsx</a></b></td>
												<td>- Generates a historic action card displaying project details, duration, and stack tags<br>- Allows editing and deleting actions with a confirmation prompt<br>- Utilizes icons, buttons, and popovers for a user-friendly interface<br>- Integrates with context providers for modal and action functionalities.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/app/components/Historic/components/Button.tsx'>Button.tsx</a></b></td>
												<td>- The Button component in the Historic section of the project provides a reusable button element with customizable variants like default, form, icon, and destructive<br>- It leverages Tailwind CSS for styling and integrates with the dark mode feature<br>- The component encapsulates button functionality and appearance, enhancing codebase modularity and consistency.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/app/components/Historic/components/HistoricActionCardSkeleton.tsx'>HistoricActionCardSkeleton.tsx</a></b></td>
												<td>Generates a skeleton layout for historic action cards, displaying loading placeholders for various content elements.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/app/components/Historic/components/Icon.tsx'>Icon.tsx</a></b></td>
												<td>- Defines and exports components for displaying state icons and text with corresponding styles based on different variants like 'rejected', 'waiting', or 'approved'<br>- The components utilize various icons and colors to visually represent each state, enhancing the user interface of the application.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/app/components/Historic/components/Popover.tsx'>Popover.tsx</a></b></td>
												<td>- Enhances user interaction by providing a customizable popover component with trigger and arrow elements<br>- The component manages content alignment based on screen width, offering a seamless user experience within the project's component architecture.</td>
											</tr>
											</table>
										</blockquote>
									</details>
								</blockquote>
							</details>
							<details>
								<summary><b>Members</b></summary>
								<blockquote>
									<table>
									<tr>
										<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/app/components/Members/index.tsx'>index.tsx</a></b></td>
										<td>- Implement a component that manages and displays members based on various filters<br>- It fetches member data, applies filters, and renders member cards dynamically<br>- Users can export member data to CSV<br>- The component also handles loading states and displays a skeleton loader when needed.</td>
									</tr>
									<tr>
										<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/app/components/Members/exportExcel.ts'>exportExcel.ts</a></b></td>
										<td>- Exports formatted member data to an Excel file for download<br>- Maps and sorts member information, then generates an Excel sheet using XLSX library<br>- Handles errors during export.</td>
									</tr>
									<tr>
										<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/app/components/Members/filterOptions.tsx'>filterOptions.tsx</a></b></td>
										<td>- Define member filter options for the FilterBar component, including search, project, area, year, role, sorting, and status filters<br>- Options are predefined for each filter type, enhancing user experience and filtering capabilities within the application.</td>
									</tr>
									</table>
									<details>
										<summary><b>components</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/app/components/Members/components/MemberCardSkeleton.tsx'>MemberCardSkeleton.tsx</a></b></td>
												<td>- Generates a skeleton layout for a member card component, displaying placeholder content for loading states<br>- The component utilizes a Card wrapper with various styling classes to structure the layout<br>- TextSkeleton components are used to represent text content placeholders, while an icon for additional actions is included<br>- This file contributes to enhancing user experience during data loading periods within the project's member-related components.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/app/components/Members/components/MemberCard.tsx'>MemberCard.tsx</a></b></td>
												<td>- Implement a React component to display member information and allow deactivation<br>- Utilizes context for member data management and toast notifications for user feedback<br>- Dynamically adjusts UI based on user interaction<br>- Promotes code reusability and maintainability within the project's component architecture.</td>
											</tr>
											</table>
										</blockquote>
									</details>
								</blockquote>
							</details>
							<details>
								<summary><b>Selector</b></summary>
								<blockquote>
									<table>
									<tr>
										<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/app/components/Selector/index.tsx'>index.tsx</a></b></td>
										<td>- Enables dynamic selection of members or areas, with the ability to add or remove selections<br>- Utilizes a modal for user interaction and displays selected items accordingly<br>- Integrates with external data sources for member information and stack tags<br>- Enhances user experience by providing a flexible and interactive component for managing selections within the application.</td>
									</tr>
									</table>
									<details>
										<summary><b>components</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/app/components/Selector/components/SelectorModal.tsx'>SelectorModal.tsx</a></b></td>
												<td>- Enables selection of members or stack tags, updating values and closing modal<br>- Utilizes hooks for data retrieval and state management<br>- Dynamically filters and displays options based on search input<br>- Handles submission and cancellation actions<br>- Supports both light and dark mode themes for a seamless user experience.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/app/components/Selector/components/Row.tsx'>Row.tsx</a></b></td>
												<td>- Implements a row component for the Selector feature, managing text display and close functionality<br>- Utilizes dark mode settings and fade animation for visual appeal.</td>
											</tr>
											</table>
										</blockquote>
									</details>
								</blockquote>
							</details>
							<details>
								<summary><b>ActionModal</b></summary>
								<blockquote>
									<table>
									<tr>
										<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/app/components/ActionModal/index.tsx'>index.tsx</a></b></td>
										<td>- The ActionModal component manages the creation and editing of project actions<br>- It integrates form validation, user interaction, and data handling to facilitate a seamless workflow for users<br>- By leveraging various hooks and schemas, it ensures a structured approach to capturing essential action details within the application.</td>
									</tr>
									</table>
									<details>
										<summary><b>contexts</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/app/components/ActionModal/contexts/action_modal_context.tsx'>action_modal_context.tsx</a></b></td>
												<td>- Defines and provides a context for managing current members and stack tags within the Action Modal component<br>- The code establishes a context interface and a provider to handle state updates for these values, ensuring seamless communication and synchronization across the component hierarchy.</td>
											</tr>
											</table>
										</blockquote>
									</details>
									<details>
										<summary><b>hooks</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/app/components/ActionModal/hooks/useActionModal.ts'>useActionModal.ts</a></b></td>
												<td>Enables access to and manipulation of data within the Action Modal context for components in the codebase.</td>
											</tr>
											</table>
										</blockquote>
									</details>
								</blockquote>
							</details>
						</blockquote>
					</details>
					<details>
						<summary><b>hooks</b></summary>
						<blockquote>
							<table>
							<tr>
								<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/app/hooks/useAction.ts'>useAction.ts</a></b></td>
								<td>- Enables managing actions and their updates within the project by providing functions for creating, updating, and deleting actions<br>- Handles action validation, error handling, and success notifications<br>- Utilizes context and modal hooks for seamless interaction<br>- Facilitates efficient handling of action-related data and state changes.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/app/hooks/useMember.ts'>useMember.ts</a></b></td>
								<td>- Facilitates access to member-related functionalities and data within the project by leveraging the MemberContext<br>- The code consolidates key operations like retrieving, creating, updating, and deleting members, along with handling member states and permissions<br>- It streamlines member management tasks for seamless integration across the codebase architecture.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/app/hooks/useDarkMode.ts'>useDarkMode.ts</a></b></td>
								<td>Enables access to dark mode settings and toggling functionality by utilizing the ThemeContext in the project architecture.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/app/hooks/useModal.ts'>useModal.ts</a></b></td>
								<td>Enables accessing modal state and functions from the ModalContext in the codebase.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/app/hooks/useProject.ts'>useProject.ts</a></b></td>
								<td>Enables fetching and handling project data from the ProjectContext, providing access to all projects, the current project list, and a function to update the list.</td>
							</tr>
							</table>
						</blockquote>
					</details>
					<details>
						<summary><b>utils</b></summary>
						<blockquote>
							<details>
								<summary><b>functions</b></summary>
								<blockquote>
									<table>
									<tr>
										<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/app/utils/functions/formatters.ts'>formatters.ts</a></b></td>
										<td>- Provides utility functions for formatting and transforming data related to project codes and registration numbers<br>- Includes functions for converting registration numbers to and from JSON format, formatting associated members' registration numbers, converting plain text to registration numbers, mapping project codes to project names, and generating project codes from project names.</td>
									</tr>
									<tr>
										<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/app/utils/functions/timeStamp.ts'>timeStamp.ts</a></b></td>
										<td>- Convert timestamps to dates, manipulate time formats, and perform time-related calculations<br>- The code in src/app/utils/functions/timeStamp.ts provides functions to handle timestamp conversions, formatting, and calculations<br>- It plays a crucial role in managing time-related operations within the project architecture.</td>
									</tr>
									</table>
								</blockquote>
							</details>
						</blockquote>
					</details>
				</blockquote>
			</details>
			<details>
				<summary><b>@clean</b></summary>
				<blockquote>
					<details>
						<summary><b>modules</b></summary>
						<blockquote>
							<details>
								<summary><b>project</b></summary>
								<blockquote>
									<details>
										<summary><b>usecases</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/@clean/modules/project/usecases/get_all_projects_usecase.ts'>get_all_projects_usecase.ts</a></b></td>
												<td>Retrieves all projects from the repository to be used in the application.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/@clean/modules/project/usecases/update_project_usecase.ts'>update_project_usecase.ts</a></b></td>
												<td>- UpdateProjectUsecase class facilitates updating project details in the project repository<br>- It accepts various parameters to modify project attributes such as code, name, description, and user IDs<br>- The class interacts with the project repository interface to update the project and returns the updated project object.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/@clean/modules/project/usecases/get_project_usecase.ts'>get_project_usecase.ts</a></b></td>
												<td>- The GetProjectUsecase class retrieves project data from the repository based on a given code<br>- It serves as a bridge between the application's business logic and data layer, enabling the retrieval of project information for further processing within the codebase architecture.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/@clean/modules/project/usecases/delete_project_usecase.ts'>delete_project_usecase.ts</a></b></td>
												<td>Implements a use case to delete a project from the repository, returning the deleted project.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/@clean/modules/project/usecases/create_project_usecase.ts'>create_project_usecase.ts</a></b></td>
												<td>- Enables creation of projects by interacting with project repository<br>- Handles input parameters to create a new project with specified details.</td>
											</tr>
											</table>
										</blockquote>
									</details>
									<details>
										<summary><b>domain</b></summary>
										<blockquote>
											<details>
												<summary><b>repositories</b></summary>
												<blockquote>
													<table>
													<tr>
														<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/@clean/modules/project/domain/repositories/project_repository_interface.ts'>project_repository_interface.ts</a></b></td>
														<td>- Define an interface for project repository operations, including creating, deleting, updating, and retrieving projects<br>- The interface specifies methods for managing project data, such as creating new projects, updating project details, and fetching project information.</td>
													</tr>
													</table>
												</blockquote>
											</details>
										</blockquote>
									</details>
								</blockquote>
							</details>
							<details>
								<summary><b>action</b></summary>
								<blockquote>
									<details>
										<summary><b>usecases</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/@clean/modules/action/usecases/create_associated_action_usecase.ts'>create_associated_action_usecase.ts</a></b></td>
												<td>Enables creation of associated actions by interacting with the action repository, contributing to the project's modular architecture.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/@clean/modules/action/usecases/delete_action_usecase.ts'>delete_action_usecase.ts</a></b></td>
												<td>Implements a use case to delete an action by interacting with the action repository.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/@clean/modules/action/usecases/update_action_validation.ts'>update_action_validation.ts</a></b></td>
												<td>Enables updating the validation status of an action in the project's architecture.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/@clean/modules/action/usecases/create_action_usecase.ts'>create_action_usecase.ts</a></b></td>
												<td>- Defines CreateActionUsecase class with execute method to create an action using provided parameters<br>- Utilizes IActionRepository interface to interact with the data layer<br>- Facilitates the creation of actions within the project by encapsulating the necessary logic for creating and storing actions.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/@clean/modules/action/usecases/get_history_usecase.ts'>get_history_usecase.ts</a></b></td>
												<td>- Implements a use case for retrieving historical actions based on specified parameters<br>- Handles various combinations of start, end, amount, and exclusive start key inputs to fetch relevant data from the action repository<br>- Throws an error if no actions are found in the response.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/@clean/modules/action/usecases/update_action_usecase.ts'>update_action_usecase.ts</a></b></td>
												<td>Enables updating actions in the system by interacting with the action repository.</td>
											</tr>
											</table>
										</blockquote>
									</details>
									<details>
										<summary><b>domain</b></summary>
										<blockquote>
											<details>
												<summary><b>repositories</b></summary>
												<blockquote>
													<table>
													<tr>
														<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/@clean/modules/action/domain/repositories/action_repository_interface.ts'>action_repository_interface.ts</a></b></td>
														<td>- Defines interfaces for creating, retrieving, updating, and deleting actions and associated actions within the project's domain<br>- Allows for managing actions, associated members, and related details like start/end dates, project codes, and descriptions<br>- Supports pagination and validation of actions, ensuring efficient and accurate data handling.</td>
													</tr>
													</table>
												</blockquote>
											</details>
										</blockquote>
									</details>
								</blockquote>
							</details>
							<details>
								<summary><b>member</b></summary>
								<blockquote>
									<details>
										<summary><b>usecases</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/@clean/modules/member/usecases/get_all_members_usecase.ts'>get_all_members_usecase.ts</a></b></td>
												<td>- Retrieves all members from the repository, handling the case where no members are found by throwing a specific error<br>- This use case is a crucial part of the project's architecture, ensuring the availability of member data for further processing within the system.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/@clean/modules/member/usecases/delete_member_usecase.ts'>delete_member_usecase.ts</a></b></td>
												<td>Implements a use case to delete a member from the repository, facilitating the removal of member data from the system.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/@clean/modules/member/usecases/get_all_members_admin_usecase.ts'>get_all_members_admin_usecase.ts</a></b></td>
												<td>Enables retrieval of all members for admin use, handling cases where no members are found.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/@clean/modules/member/usecases/update_member_usecase.ts'>update_member_usecase.ts</a></b></td>
												<td>- UpdateMemberUsecase class facilitates updating member details in the system via the execute method<br>- It leverages the IMemberRepository interface to interact with member data, allowing modifications to various attributes like name, email, role, and more<br>- This use case plays a crucial role in managing member information within the project architecture.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/@clean/modules/member/usecases/create_member_usecase.ts'>create_member_usecase.ts</a></b></td>
												<td>Enables creation of new members in the system by utilizing specified member details.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/@clean/modules/member/usecases/get_member_usecase.ts'>get_member_usecase.ts</a></b></td>
												<td>- The `GetMemberUsecase` class retrieves a member entity from the repository<br>- It plays a crucial role in the project's architecture by encapsulating the logic for fetching a member, promoting separation of concerns and maintainability.</td>
											</tr>
											</table>
										</blockquote>
									</details>
									<details>
										<summary><b>domain</b></summary>
										<blockquote>
											<details>
												<summary><b>repositories</b></summary>
												<blockquote>
													<table>
													<tr>
														<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/@clean/modules/member/domain/repositories/member_repository_interface.ts'>member_repository_interface.ts</a></b></td>
														<td>- Define the interface for member repository operations, including creating, retrieving, updating, and deleting members<br>- The interface specifies methods for managing member data such as creating new members, fetching all members, updating member details, and deleting members.</td>
													</tr>
													</table>
												</blockquote>
											</details>
										</blockquote>
									</details>
								</blockquote>
							</details>
						</blockquote>
					</details>
					<details>
						<summary><b>shared</b></summary>
						<blockquote>
							<details>
								<summary><b>domain</b></summary>
								<blockquote>
									<details>
										<summary><b>entities</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/@clean/shared/domain/entities/member.ts'>member.ts</a></b></td>
												<td>- Defines a Member entity with key attributes like name, email, role, and more<br>- It encapsulates data and provides methods for conversion to JSON format and instantiation from JSON<br>- This entity plays a crucial role in representing and managing member information within the project architecture.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/@clean/shared/domain/entities/associated_action.ts'>associated_action.ts</a></b></td>
												<td>- Defines a domain entity for an associated action with validation and JSON conversion methods<br>- Ensures data integrity by validating action ID, start date, and user ID<br>- Facilitates seamless conversion to and from JSON format.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/@clean/shared/domain/entities/project.ts'>project.ts</a></b></td>
												<td>- The Project entity class enforces strict validation rules for project properties like code, name, and user IDs<br>- It ensures data integrity and consistency within the project domain, facilitating reliable data handling and manipulation across the codebase architecture.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/@clean/shared/domain/entities/action.ts'>action.ts</a></b></td>
												<td>Define and structure domain entities for actions within the project, facilitating conversion to and from JSON format.</td>
											</tr>
											</table>
										</blockquote>
									</details>
									<details>
										<summary><b>enums</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/@clean/shared/domain/enums/http_status_code.ts'>http_status_code.ts</a></b></td>
												<td>- Define HTTP status codes as constants for the project's shared domain, ensuring consistency and reusability across the codebase<br>- This file centralizes status codes like OK, CREATED, BAD_REQUEST, UNAUTHORIZED, FORBIDDEN, NOT_FOUND, and INTERNAL_SERVER_ERROR for easy reference and maintenance.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/@clean/shared/domain/enums/role_enum.ts'>role_enum.ts</a></b></td>
												<td>Defines role-related enums and functions for role conversion and translation within the shared domain of the project architecture.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/@clean/shared/domain/enums/course_enum.ts'>course_enum.ts</a></b></td>
												<td>Translate and map course codes to their corresponding names, enhancing readability and maintainability of the project.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/@clean/shared/domain/enums/active_enum.ts'>active_enum.ts</a></b></td>
												<td>Define an enum and a function to convert a string to an enum value representing different states of activity.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/@clean/shared/domain/enums/action_type_enum.ts'>action_type_enum.ts</a></b></td>
												<td>Define enums and functions to handle action types and their translations for various activities in the project.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/@clean/shared/domain/enums/stage_enum.ts'>stage_enum.ts</a></b></td>
												<td>- Defines an enum for different stages (test, dev, homolog, prod) and a function to convert a string value to the corresponding enum<br>- This code file plays a crucial role in standardizing and managing environment stages across the project architecture.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/@clean/shared/domain/enums/stack_enum.ts'>stack_enum.ts</a></b></td>
												<td>- Defines and translates project stack enums, formats stack tags, and converts stack arrays<br>- This code file plays a crucial role in maintaining consistency and clarity across the codebase by handling stack-related operations seamlessly.</td>
											</tr>
											</table>
										</blockquote>
									</details>
									<details>
										<summary><b>helpers</b></summary>
										<blockquote>
											<details>
												<summary><b>errors</b></summary>
												<blockquote>
													<table>
													<tr>
														<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/@clean/shared/domain/helpers/errors/domain_error.ts'>domain_error.ts</a></b></td>
														<td>Defines custom error classes for domain-specific errors in the shared domain helpers, enhancing error handling and clarity in the codebase architecture.</td>
													</tr>
													</table>
												</blockquote>
											</details>
										</blockquote>
									</details>
								</blockquote>
							</details>
							<details>
								<summary><b>infra</b></summary>
								<blockquote>
									<table>
									<tr>
										<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/@clean/shared/infra/http.ts'>http.ts</a></b></td>
										<td>- Enhances HTTP requests by handling token refresh logic based on network errors<br>- Utilizes Axios interceptors to automatically renew access tokens using refresh tokens stored in local storage<br>- Implements a robust mechanism to ensure seamless authentication flow and maintain secure communication with the backend API.</td>
									</tr>
									</table>
									<details>
										<summary><b>containers</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/@clean/shared/infra/containers/container_action.ts'>container_action.ts</a></b></td>
												<td>Defines container bindings for repositories and use cases based on environment stages, facilitating dependency injection for actions in the project architecture.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/@clean/shared/infra/containers/container_project.ts'>container_project.ts</a></b></td>
												<td>- Defines container bindings for HTTP adapters, repositories, and use cases based on the environment stage<br>- Handles dependency injection for project-related functionality, ensuring the correct implementations are provided for different stages like test, development, and production<br>- This file plays a crucial role in setting up the project's dependency injection container for project operations.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/@clean/shared/infra/containers/container_member.ts'>container_member.ts</a></b></td>
												<td>Defines container bindings for repositories and use cases based on environment stages, facilitating dependency injection for member-related functionalities in the project architecture.</td>
											</tr>
											</table>
										</blockquote>
									</details>
									<details>
										<summary><b>repositories</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/@clean/shared/infra/repositories/action_repository_http.ts'>action_repository_http.ts</a></b></td>
												<td>- Manages HTTP requests for actions, including updating, creating, and retrieving historical data<br>- Handles authentication, error handling, and data formatting<br>- Integrates with Axios for API communication.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/@clean/shared/infra/repositories/project_repository_http.ts'>project_repository_http.ts</a></b></td>
												<td>- Handles HTTP requests to interact with project data, including creating, deleting, updating, and retrieving projects<br>- Manages project information such as code, name, description, members, and dates<br>- Implements authorization checks and data formatting for communication with the backend API.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/@clean/shared/infra/repositories/action_repository_mock.ts'>action_repository_mock.ts</a></b></td>
												<td>- The code file `action_repository_mock.ts` located in `src/@clean/shared/infra/repositories/` serves as a mock implementation for handling actions within the project<br>- It interacts with various domain entities such as Action, AssociatedAction, Project, and Member, providing a simulated environment for testing and development purposes<br>- This file plays a crucial role in simulating repository behavior and data interactions within the project's architecture.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/@clean/shared/infra/repositories/member_repository_http.ts'>member_repository_http.ts</a></b></td>
												<td>- Manages HTTP requests for member data, including creation, retrieval, update, and deletion<br>- Utilizes Axios for API calls and handles responses to interact with the backend system<br>- Implements methods to handle various member-related operations securely, ensuring proper authentication and error handling throughout the process.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/@clean/shared/infra/repositories/project_repository_mock.ts'>project_repository_mock.ts</a></b></td>
												<td>- Implements a mock project repository with CRUD operations for managing project data<br>- Stores project details like code, name, description, team members, and start date<br>- Supports creating, deleting, updating, and retrieving projects.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/src/@clean/shared/infra/repositories/member_repository_mock.ts'>member_repository_mock.ts</a></b></td>
												<td>Implements a mock Member Repository with CRUD operations for managing member data in the project.</td>
											</tr>
											</table>
										</blockquote>
									</details>
								</blockquote>
							</details>
						</blockquote>
					</details>
				</blockquote>
			</details>
		</blockquote>
	</details>
	<details> <!-- .github Submodule -->
		<summary><b>.github</b></summary>
		<blockquote>
			<details>
				<summary><b>workflows</b></summary>
				<blockquote>
					<table>
					<tr>
						<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/.github/workflows/check_owner.yml'>check_owner.yml</a></b></td>
						<td>- Implements a workflow to check and approve pull request owners on specified branches<br>- The code file orchestrates the execution of a reusable workflow for verifying PR ownership, enhancing the project's quality control process.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/.github/workflows/aws_cd.yml'>aws_cd.yml</a></b></td>
						<td>- Automates AWS Continuous Deployment (CD) process for different branches<br>- Sets up AWS credentials, Node.js environment, and deploys using AWS CDK<br>- Configures environment variables and deploys to S3 with CloudFront cache invalidation.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/.github/workflows/create_pr.yml'>create_pr.yml</a></b></td>
						<td>- Automates pull request creation based on branch pushes, excluding the 'prod' branch<br>- Utilizes a reusable workflow for pull requests from the specified repository.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/Maua-Dev/portal_interno_front/blob/master/.github/workflows/react_ci.yml'>react_ci.yml</a></b></td>
						<td>- Automate React.js CI pipeline for branches dev, homolog, and prod<br>- Run Node.js 18.x, install dependencies, build React.js app, and upload coverage reports to Codecov using GitHub Actions.</td>
					</tr>
					</table>
				</blockquote>
			</details>
		</blockquote>
	</details>
</details>

---
##  Getting Started

###  Prerequisites

Before getting started with portal_interno_front, ensure your runtime environment meets the following requirements:

- **Programming Language:** TypeScript
- **Package Manager:** Npm, Yarn


###  Installation

Install portal_interno_front using one of the following methods:

**Build from source:**

1. Clone the portal_interno_front repository:
```sh
❯ git clone https://github.com/Maua-Dev/portal_interno_front
```

2. Navigate to the project directory:
```sh
❯ cd portal_interno_front
```

3. Install the project dependencies:


**Using `npm`** &nbsp; [<img align="center" src="https://img.shields.io/badge/npm-CB3837.svg?style={badge_style}&logo=npm&logoColor=white" />](https://www.npmjs.com/)

```sh
❯ npm install
```




###  Usage
Run portal_interno_front using the following command:
**Using `npm`** &nbsp; [<img align="center" src="https://img.shields.io/badge/npm-CB3837.svg?style={badge_style}&logo=npm&logoColor=white" />](https://www.npmjs.com/)

```sh
❯ npm start
```



###  Testing
Run the test suite using the following command:
**Using `npm`** &nbsp; [<img align="center" src="https://img.shields.io/badge/npm-CB3837.svg?style={badge_style}&logo=npm&logoColor=white" />](https://www.npmjs.com/)

```sh
❯ npm test
```


##  Contributing

- **💬 [Join the Discussions](https://github.com/Maua-Dev/portal_interno_front/discussions)**: Share your insights, provide feedback, or ask questions.
- **🐛 [Report Issues](https://github.com/Maua-Dev/portal_interno_front/issues)**: Submit bugs found or log feature requests for the `portal_interno_front` project.
- **💡 [Submit Pull Requests](https://github.com/Maua-Dev/portal_interno_front/blob/main/CONTRIBUTING.md)**: Review open PRs, and submit your own PRs.

<details closed>
<summary>Contributing Guidelines</summary>

1. **Fork the Repository**: Start by forking the project repository to your github account.
2. **Clone Locally**: Clone the forked repository to your local machine using a git client.
   ```sh
   git clone https://github.com/Maua-Dev/portal_interno_front
   ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
   ```sh
   git checkout -b new-feature-x
   ```
4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear message describing your updates.
   ```sh
   git commit -m 'Implemented new feature x.'
   ```
6. **Push to github**: Push the changes to your forked repository.
   ```sh
   git push origin new-feature-x
   ```
7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.
8. **Review**: Once your PR is reviewed and approved, it will be merged into the main branch. Congratulations on your contribution!
</details>

<details closed>
<summary>Contributor Graph</summary>
<br>
<p align="left">
   <a href="https://github.com{/Maua-Dev/portal_interno_front/}graphs/contributors">
      <img src="https://contrib.rocks/image?repo=Maua-Dev/portal_interno_front">
   </a>
</p>
</details>

---

##  License

This project is protected under the [MIT License](./LICENSE).

---

##  Acknowledgments

- List any resources, contributors, inspiration, etc. here.

---
