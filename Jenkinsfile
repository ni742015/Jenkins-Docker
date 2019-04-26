import groovy.json.JsonSlurper

node {
    currentBuild.result = "SUCCESS"
    echo "PWD: ${pwd()}"

    // 判断发布环境
    if (env.BRANCH_NAME == 'release') {
        env.PRO_ENV = "pro"
    } else {
        env.PRO_ENV = "test"
    }

    // 默认设置
    env.VERSION = '1.0.0'
    env.credentialsId = ''
    env.host = ''
    def registryName = ''
    def imageName = ''
    def input_result // 用户输入项

    
    try {
        stage('config') {
            echo "Branch: ${env.BRANCH_NAME}, Environment: ${env.PRO_ENV}"

            input_result = input message: 'Check Tasks', ok: 'ok', parameters: [
                booleanParam(name: 'install', defaultValue: false),
                booleanParam(name: 'test', defaultValue: true),
                booleanParam(name: 'deploy', defaultValue: true)
            ]
        }
        
        stage('Checkout'){
            // 重置本地修改项
            try {
                sh 'git checkout .'
            } catch (err) {

            }
            
            checkout scm

            // 读取配置信息
            if(fileExists('config.json')) {
                def str = readFile 'config.json'
                def jsonSlurper = new JsonSlurper()
                def obj = jsonSlurper.parseText(str)

                registryName = obj.registryName
                envConifg = obj.env[env.PRO_ENV]
                
                env.VERSION = obj.version
                env.credentialsId = envConifg.credentialsId
                env.host = envConifg.host

                imageName = "${registryName}:${env.VERSION}_${env.PRO_ENV}_${BUILD_NUMBER}"

                echo "VERSION: ${env.VERSION} ${imageName}"
            }
            
            sh 'ls'
        }

        stage('Install'){
            if(input_result.install) {
                docker.image('node:9.6.0').inside {
                    sh 'node -v'
                    sh 'sh ./scripts/install.sh'
                }
            }
        }

        stage('Test'){
            if(input_result.test) {
                docker.image('node:9.6.0').inside {
                    sh 'sh ./scripts/test.sh'
                }
            }
        }

        stage('Build Docker'){
            // 构建上传镜像到容器仓库
            if(input_result.deploy) {
                def customImage = docker.build(imageName, "--build-arg PRO_ENV=${env.PRO_ENV} .")

                docker.withRegistry("https://${registryName}", 'docker-demo') {
                    /* Push the container to the custom Registry */
                    customImage.push()
                }
            }
        }

        stage('Deploy'){
            if(input_result.deploy) {
                // wechat服务器
                withCredentials([usernamePassword(credentialsId: env.credentialsId, usernameVariable: 'USER', passwordVariable: 'PWD')]) {
                    def otherArgs = '-p 10001:10001' // 区分不同环境的启动参数
                    def remote = [:]
                    remote.name = 'ssh-deploy'
                    remote.allowAnyHosts = true
                    remote.host = env.host
                    remote.user = USER
                    remote.password = PWD
                
                    if(env.PRO_ENV == "pro") {
                        otherArgs = '-p 3000:3000'
                    }

                    try {
                        sshCommand remote: remote, command: "docker rm -f demo"
                    } catch (err) {

                    }
                    sshCommand remote: remote, command: "docker run -d --name demo -v /etc/localtime:/etc/localtime -e PRO_ENV='${env.PRO_ENV}' ${otherArgs} ${imageName}"
                }

                // 删除旧的镜像
                sh "docker rmi -f ${imageName.replaceAll("_${BUILD_NUMBER}", "_${BUILD_NUMBER - 1}")}"
            }
        }
    }
    catch (err) {
        currentBuild.result = "FAILURE"
        throw err
    }

}