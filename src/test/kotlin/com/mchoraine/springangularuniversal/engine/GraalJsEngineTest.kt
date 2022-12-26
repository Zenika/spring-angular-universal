package com.mchoraine.springangularuniversal.engine

import org.junit.jupiter.api.Test
import java.io.StringWriter
import java.util.*

class GraalJsEngineTest {
    @Test
    fun testRender() {
        val writer = StringWriter()
        GraalJsEngine().evaluate("index", writer, emptyMap(), Locale.FRANCE)
        print(writer.buffer.toString())
    }
}
