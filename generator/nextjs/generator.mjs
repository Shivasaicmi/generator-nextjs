import chalk from "chalk";
import yosay from 'yosay';
import ReactGenerator from "generator-jhipster/generators/react";
import { loadReactGeneratorOpts } from './prompts.mjs';
import { deleteUnwantedFiles, processApiServersforClinet, loadDeploymentConfigs, loadServicesWithAndWithOutDB, loadAppConfigs } from "./utils.mjs";

export default class extends ReactGenerator {
  constructor(args, opts, features) {
    super(args, opts, features);

    if (this.options.help) return;

    if (!this.options.jhipsterContext) {
      throw new Error(
        `This is a JHipster blueprint and should be used only like ${chalk.yellow(
          "jhipster --blueprints nextjs"
        )}`
      );
    }
  }

  get [ReactGenerator.INITIALIZING]() {
    return {
      ...super.initializing,
      async initializingTemplateTask() { },
    };
  }

  get [ReactGenerator.PROMPTING]() {
    return {
      // ...super.prompting,
      // async promptingTemplateTask() {},
      prompting() {
        this.log(
          yosay(
            `${chalk.red('nextjs-blueprint')}`
          )
        );
      },
      loadReactGeneratorOpts
    };
  }

  get [ReactGenerator.CONFIGURING]() {
    return {
      // ...super.configuring,
      // async configuringTemplateTask() {},
    };
  }

  get [ReactGenerator.COMPOSING]() {
    return {
      // ...super.composing,
      // async composingTemplateTask() {},
    };
  }

  get [ReactGenerator.LOADING]() {
    return {
      // ...super.loading,
      // async loadingTemplateTask() {},
    };
  }

  get [ReactGenerator.PREPARING]() {
    return {
      // ...super.preparing,
      // async preparingTemplateTask() {},
    };
  }

  get [ReactGenerator.CONFIGURING_EACH_ENTITY]() {
    return {
      // ...super.configuringEachEntity,
      // async configuringEachEntityTemplateTask() {},
    };
  }

  get [ReactGenerator.LOADING_ENTITIES]() {
    return {
      // ...super.loadingEntities,
      // async loadingEntitiesTemplateTask() {},
    };
  }

  get [ReactGenerator.PREPARING_EACH_ENTITY]() {
    return {
      // ...super.preparingEachEntity,
      // async preparingEachEntityTemplateTask() {},
    };
  }

  get [ReactGenerator.PREPARING_EACH_ENTITY_FIELD]() {
    return {
      // ...super.preparingEachEntityField,
      // async preparingEachEntityFieldTemplateTask() {},
    };
  }

  get [ReactGenerator.PREPARING_EACH_ENTITY_RELATIONSHIP]() {
    return {
      // ...super.preparingEachEntityRelationship,
      // async preparingEachEntityRelationshipTemplateTask() {},
    };
  }

  get [ReactGenerator.POST_PREPARING_EACH_ENTITY]() {
    return {
      // ...super.postPreparingEachEntity,
      // async postPreparingEachEntityTemplateTask() {},
    };
  }

  get [ReactGenerator.DEFAULT]() {
    return {
      // ...super.default,
      // async defaultTemplateTask() {},
    };
  }

  get [ReactGenerator.WRITING]() {
    return {
      ...super.writing,
    };
  }

  get [ReactGenerator.WRITING_ENTITIES]() {
    return {
      // ...super.writingEntities,
      // async writingEntitiesTemplateTask() {},
    };
  }

  get [ReactGenerator.POST_WRITING]() {
    return {
      // ...super.postWriting,
      // async postWritingTemplateTask() {},
    };
  }

  get [ReactGenerator.POST_WRITING_ENTITIES]() {
    return {
      // ...super.postWritingEntities,
      // async postWritingEntitiesTemplateTask() {},
    };
  }

  get [ReactGenerator.INSTALL]() {
    return {
      // ...super.install,
      // async installTemplateTask() {},
    };
  }

  get [ReactGenerator.POST_INSTALL]() {
    return {
      // ...super.postInstall,
      // async postInstallTemplateTask() {},
    };
  }

  get [ReactGenerator.END]() {
    return {
      writing() {

        let apiServers = processApiServersforClinet.call(this);
        let {servicesWithDB, servicesWithOutDB} = loadServicesWithAndWithOutDB.call(this);


        console.log("api servers");
        console.log(apiServers);
        console.log("services with db");
        console.log(servicesWithDB);
        console.log("services without db");
        console.log(servicesWithOutDB);


        const templateVariables = {
          serverPort: 4000,
          baseName: 'huddle',
          oauth2: true,
          apiServers: apiServers,
          servicesWithDB: servicesWithDB,
          servicesWithOutDB: servicesWithOutDB,
        };
        const templatePaths = [
          { src: "public/", dest: "public/" },
          { src: "src/", dest: "src/" },
          {src:".eslintrc.json",dest:".eslintrc.json"},
          { src:"jsconfig.json",dest:"jsconfig.json" },
          {src:"next.config.mjs",dest:"next.config.mjs"},
          { src: ".gitignore", dest: ".gitignore" },
          { src: "package.json", dest: "package.json" },
          { src: "README.md", dest: "README.md" },
        ];
        templatePaths.forEach(({ src, dest }) => {
          this.fs.copyTpl(
            this.templatePath(src),
            this.destinationPath(dest),
            templateVariables
          );
        });
      }
    };
  }
}