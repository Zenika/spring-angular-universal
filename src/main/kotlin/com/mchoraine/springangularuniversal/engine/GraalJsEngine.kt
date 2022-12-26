package com.mchoraine.springangularuniversal.engine

import org.graalvm.polyglot.Context
import org.graalvm.polyglot.HostAccess
import java.io.Writer
import java.util.*
import java.util.function.Consumer
import java.util.function.Supplier


class GraalJsEngine {

    val source = initBundleSource()
    val cx = initContext()
    val templates = mapOf("index" to getTemplate("index"))

    fun evaluate(templateName: String, writer: Writer, model: Map<String, Any>, locale: Locale) {
        val res = cx.getBindings("js").getMember("render").execute(templates[templateName], model)
        res.invokeMember("then", WriteContent(writer))
    }

    private fun initContext(): Context {
        val cx: Context = Context.newBuilder("js")
            .option("js.global-property", "true")
            .option("js.commonjs-require", "true")
            .option("js.commonjs-core-modules-replacements", "http:./http,https:./http,os:./os,url:./url")
            .option("js.commonjs-require-cwd", "/Users/mchoraine/Workspace/Perso/spring-angular-universal/src/main/resources/commonjs")
            .allowAllAccess(true)
            .allowExperimentalOptions(true)
            .build()
        cx.getBindings("js").putMember("process", NodeProcess())
        cx.getBindings("js").putMember("setTimeout", MockTimer())
        cx.getBindings("js").putMember("setInterval", MockTimer())
        cx.getBindings("js").putMember("clearTimeout", MockTimer())
        cx.getBindings("js").putMember("clearInterval", MockTimer())
        cx.getBindings("js").putMember("render", null)
        cx.eval("js", source)
        return cx
    }

    private fun initBundleSource(): String? = this::class.java.getResource("/server/main.js")?.readText()

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
            println("write content")
            writer.write(res)
        }

    }

}
