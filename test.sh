file='./prisma/schema.prisma'
output_file='./output.txt'
declare -A models
in_model=false
current_model=""
declare -a attributes

to_lower() {
    echo "$1" | tr '[:upper:]' '[:lower:]'
}

to_lower_and_remove_underscore() {
    echo "${1,,}" | tr -d '_'
}

while IFS= read -r line; do
    if echo "$line" | grep -qE '^\s*model\s+([^{]+)'; then
        model_name=$(echo "$line" | awk '{print $2}' | tr -d '[:space:]')
        if [ ! -e "./src/model/$model_name.ts" ]; then
            echo "Modelo encontrado: $model_name"
            current_model="$model_name"
            declare -A models["$current_model"]
            in_model=true
        else
            echo $model_name "já existe"
        fi
    elif $in_model && [[ "$line" != *"@@"* ]]; then
        read -r name type <<< "$(echo "$line" | awk '{print $1, $2}' | sed 's/@.*//')"
        name=$(echo "$name" | tr -d '[:space:]')
        type=$(echo "$type" | tr -d '[:space:]')
        if [[ -n "$name" && -n "$type" && "$type" != *'[]'* && "$name" != 'criado_em' && "$name" != 'modificado_em' ]]; then
            echo "Name: $name, Type: $type"
            lowercase_name_type=$(to_lower_and_remove_underscore "$name$type")
            if [[ "$(to_lower_and_remove_underscore "$name")" != "$(to_lower_and_remove_underscore "$type")" && ! "${attributes[@]}" =~ "$lowercase_name_type" ]]; then
                if [[ "$(to_lower "$type")" == "int" || "$(to_lower "$type")" == "float" ]]; then
                    type="number"
                fi
                if [[ "$(to_lower "$type")" == "datetime" ]]; then
                    type="string"
                fi
                models["$current_model"]["$name"]=$(to_lower "$type")
                attributes+=("$name" "$type")
            fi
        fi
    else
        if $in_model; then
            echo "export default class $current_model {" >> ./src/model/"$current_model.ts"
            echo "" >> ./src/model/"$current_model.ts"
            for ((i = 0; i < ${#attributes[@]}; i+=2)); do
                echo "  public get ${attributes[i]}(): $(to_lower "${attributes[i + 1]}") {" >> ./src/model/"$current_model.ts"
                echo "      return this._${attributes[i]}" >> ./src/model/"$current_model.ts"
                echo "  }" >> ./src/model/"$current_model.ts"
                echo "" >> ./src/model/"$current_model.ts"
                echo "  public set ${attributes[i]}(value: $(to_lower "${attributes[i + 1]}")) {" >> ./src/model/"$current_model.ts"
                echo "      this._${attributes[i]} = value" >> ./src/model/"$current_model.ts"
                echo "  }" >> ./src/model/"$current_model.ts"
            done
            echo "" >> ./src/model/"$current_model.ts"
            echo "  constructor(" >> ./src/model/"$current_model.ts"
            for ((i = 0; i < ${#attributes[@]}; i+=2)); do
                echo "      private _${attributes[i]}": $(to_lower "${attributes[i + 1]}"), >> ./src/model/"$current_model.ts"
            done
            echo "  ) {}" >> ./src/model/"$current_model.ts"
            echo "}" >> ./src/model/"$current_model.ts"
            unset attributes
        fi
        in_model=false
    fi
done < "$file"
