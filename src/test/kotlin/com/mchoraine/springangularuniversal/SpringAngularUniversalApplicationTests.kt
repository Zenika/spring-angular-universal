//package com.mchoraine.springangularuniversal
//
//import org.graalvm.polyglot.Context
//import org.graalvm.polyglot.HostAccess
//import org.graalvm.polyglot.Source
//import org.junit.jupiter.api.Assertions.assertEquals
//import org.junit.jupiter.api.Test
//import org.springframework.boot.test.context.SpringBootTest
//import java.io.Reader
//import java.util.function.Consumer
//
//
//@SpringBootTest
//class SpringAngularUniversalApplicationTests {
//
//    @Test
//    fun contextLoads() {
//        val ha = HostAccess.newBuilder(HostAccess.EXPLICIT) //warning: too permissive for use in production
//            .allowAccess( java.util.function.Function::class.java.getMethod("apply", Any::class.java))
//            .build()
//        val cx: Context = Context.newBuilder("js")
//            .option("js.global-property", "true")
//            .option("js.commonjs-require", "true")
//            .option("js.commonjs-core-modules-replacements", "http:./http,https:./http,os:./os,url:./http")
//            .option("js.commonjs-require-cwd", "/Users/mchoraine/Workspace/Perso/spring-angular-universal/src/main/ts")
//            .allowHostAccess(ha)
//            .allowAllAccess(true)
//            .allowExperimentalOptions(true)
//            .build()
//        cx.getBindings("js").putMember("process", NodeProcess())
//        cx.getBindings("js").putMember("setTimeout", MockTimer())
//        cx.getBindings("js").putMember("setInterval", MockTimer())
//        cx.getBindings("js").putMember("clearTimeout", MockTimer())
//        cx.getBindings("js").putMember("clearInterval", MockTimer())
//        cx.getBindings("js").putMember("setHtmlContent", object : Consumer<String> {
//            @HostAccess.Export
//            override fun accept(html: String) {
//                println(html)
//            }
//
//        })
//        val reader: Reader = this::class.java.getResourceAsStream("/main.js").reader()
//        val source = Source.newBuilder("js", reader, "main.js").build()
//        cx.eval(source)
//    }
//
//    @Test
//    fun testBindingProcess() {
//        val cx: Context = Context.newBuilder("js")
//            .option("js.global-property", "true")
//            .option("js.commonjs-require", "true")
//            .option("js.commonjs-core-modules-replacements", "http:./http,https:./http,os:./os,url:./http")
//            .option("js.commonjs-require-cwd", "/Users/mchoraine/Workspace/Perso/spring-angular-universal/src/main/ts")
//            .allowAllAccess(true)
//            .allowExperimentalOptions(true)
//            .build()
//        cx.getBindings("js").putMember("test", NodeProcess())
//        val valid: String = cx.eval(
//            "js",
//            "test.test"
//        )
//            .asString()
//        assertEquals(valid, "GraalJS")
//    }
//
//    @FunctionalInterface
//    class MockTimer : java.util.function.Consumer<java.util.function.Supplier<Unit> > {
//        @HostAccess.Export
//        override fun accept(s: java.util.function.Supplier<Unit>): Unit {
//            s.get()
//        }
//    }
//
//    class NodeProcess {
//        @JvmField
//        var versions = NodeProcessVersions()
//        @JvmField
//        var test = "GraalJS"
//
//        class NodeProcessVersions {
//            @JvmField
//            var node = "GraalJS"
//            @JvmField
//            var v8 = "V8"
//        }
//    }
//
//
//}
//
//
