package com.mchoraine.springangularuniversal.engine

import org.graalvm.polyglot.Context
import org.graalvm.polyglot.HostAccess
import org.graalvm.polyglot.Source
import java.io.FileNotFoundException
import java.io.Writer
import java.util.*
import java.util.function.Consumer
import java.util.function.Supplier

class GraalJsEngine {
    private val cx: Context = initContext()
    private val source = initBundleSource()
    fun evaluate(templateName: String, writer: Writer, model: Map<String, Any>, locale: Locale) {
        cx.enter()
        cx.getBindings("js").putMember("template", getTemplate(templateName))
        cx.getBindings("js").putMember("url", "http://localhost:8080/")
        cx.getBindings("js").putMember("setHtmlContent", WriteContent(writer))
        cx.eval(source)
        cx.leave()
    }

    private fun initContext(): Context {
//        val ha = HostAccess.newBuilder(HostAccess.EXPLICIT) //warning: too permissive for use in production
//            .allowAccess(java.util.function.Function::class.java.getMethod("apply", Any::class.java))
//            .build()
        val cx: Context = Context.newBuilder("js")
            .option("js.global-property", "true")
            .option("js.commonjs-require", "true")
            .option("js.commonjs-core-modules-replacements", "http:./http,https:./http,os:./os,url:./url")
            .option("js.commonjs-require-cwd", "/Users/mchoraine/Workspace/Perso/spring-angular-universal/src/main/ts")
            .allowAllAccess(true)
            .allowExperimentalOptions(true)
            .build()
        cx.getBindings("js").putMember("process", NodeProcess())
        cx.getBindings("js").putMember("setTimeout", MockTimer())
        cx.getBindings("js").putMember("setInterval", MockTimer())
        cx.getBindings("js").putMember("clearTimeout", MockTimer())
        cx.getBindings("js").putMember("clearInterval", MockTimer())
        return cx
    }

    private fun initBundleSource(): Source? = Source.newBuilder(
        "js",
        this::class.java.getResourceAsStream("/server/main.js")?.reader() ?: throw FileNotFoundException(),
        "main.js"
    ).build()

    private fun getTemplate(templateName: String): String {
        return this::class.java.getResource("/static/$templateName.html").readText()
    }


    @FunctionalInterface
    class MockTimer : Consumer<Supplier<Unit>> {
        @HostAccess.Export
        override fun accept(s: Supplier<Unit>) {
            s.get()
        }
    }

    class NodeProcess(
    ) {
        @JvmField
        var versions: NodeProcessVersions = NodeProcessVersions()

        class NodeProcessVersions {
            @JvmField
            var node = "GraalJS"

            @JvmField
            var v8 = "V8"
        }
    }

    class WriteContent(val writer: Writer) : Consumer<String> {
        @HostAccess.Export
        override fun accept(res: String) {
            writer.write(res)
        }

    }

}
